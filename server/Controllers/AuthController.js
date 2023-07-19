import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import otpGenerator from "otp-generator";

export const register = async (req, res, next) => {
    try{
        const { username, email, password, profile } = req.body;

        // Validation
        if(!username) return next("Username is required!");
        if(!email) return next("Email is required!");
        if(!password) return next("Password is required!");
        if(password.length < 6) return next("Password must be greater than 6 characters!");

        // Checking existing username
        const usernameExist  = await UserModel.findOne({ username });
        if(usernameExist){
            return next("Username already exists, Please try another one.")
        }

        // Checking existing email
        const emailExist = await UserModel.findOne({ email });
        if(emailExist){
            return next("Email already in use.")
        }

        // Hashing password
        const hashPass = await bcrypt.hash(password, 10)
        if(!hashPass) return next("Unable to create account1");
        console.log(hashPass)

        const user = await UserModel.create({
            username,
            email,
            password: hashPass,
            profile: profile || ''
        })

        res.status(201).send({
            success: true,
            message: "User registered Successfully",
            user: {
                username: user.username,
                email: user.email
            }
        })
    }
    catch(error){
        next("Unable to create account")
    }
}


export const verifyUser = async (req, res, next) => {
    try{
        const { username } = req.body;
        if(!username) return next("Username is required");

        const user = await UserModel.findOne({ username });
        if(!user) return next("Username Not found");

        const { password, ...rest} = Object.assign({}, user.toJSON());

        return res.status(200).send({
            success: true,
            rest
        })

    }catch(error){
        next(error)
    }
}

export const login = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        
        // Validation
        if(!username) return next("Username is required!");
        if(!password) return next("Password is required!");

        // Finding user from database
        const user = await UserModel.findOne({ username });
        if(!user){
            return next("Invalid Credentials")
        }else{
            bcrypt.compare(password, user.password)
            .then((passCheck) => {
                if(!passCheck) return next("Invalid Credentials")

                // Generating jwt token
                const token = JWT.sign({
                    userId: user._id,
                    username: user.username
                }, process.env.JWT_SECRET, { expiresIn: "24h"})

                const { password, ...rest} = Object.assign({}, user.toJSON());

                return res.status(200).send({
                    success: true,
                    message: "Login success",
                    user: rest,
                    token
                })

            })
            .catch((err) => {
                return next("Invalid Credentials")
            })
        }

    }
    catch(err){
        next("Unable to login to your account")
        console.log(err)
    }
}

export const getUser = async (req, res, next) => {
    try{
        const { username } = req.params

        if(!username) return next("User not found");

        const user = await UserModel.findOne({ username })
        if(!user) return next("User not found")

        const { password, ...rest} = Object.assign({}, user.toJSON());

        res.status(200).send({
            success: true, 
            rest
        })

    }
    catch(err){
        next("Cannot find user data")
    }
}

export const updateUser = async (req, res, next) => {
    try{
        // const {id} = req.query;
        const { userId } = req.user

        if(userId){
            const user = await UserModel.findByIdAndUpdate(userId, req.body)
            if(!user) return next("User not found")

            const { password, ...rest} = Object.assign({}, user.toJSON());

            res.status(200).json({
                success: true,
                message: "User Updated Successfully",
                rest
            })

        }else{
            next("User not found")
        }
    }
    catch(err){
        next(err)
    }
}

export const generateOTP = async (req, res, next) => {
    req.app.locals.OTP = await otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    })

    res.status(201).send({
        success: true, 
        code: req.app.locals.OTP
    })

}

export const verifyOTP = async (req, res) => {
    const { code } = req.query;

    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;

        return res.status(201).send({
            success: true, 
            message: "OTP verified"
        })
    }

    return res.status(400).send({
        success: false,
        message: "Invalid OTP"
    })
}

export const createResetSession = async (req, res) => {

    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false
        return res.status(200).send({
            success: true,
            message: "Access granted"
        })
    }

    return res.status(400).send({
        success: false,
        mesasge: "Session expired"
    })

}

export const resetPassword = async (req, res, next) => {
    try{
        if(!req.app.locals.resetSession) return next("Session expired")
        const {username, password} = req.body;

        if(!username) return next("Username is required")
        if(!password) return next("Password is required")

        try{
            const user = await UserModel.findOne({ username })
            if(!user) return next("User not found");

            const updatedPass = await bcrypt.hash(password, 10)
            if(!updatedPass) return next("Unable to hash password");

            const updated = await UserModel.findByIdAndUpdate(user._id, {password: updatedPass})
            if(!updated){return next("Error while updating the password")} 
            
            res.status(200).send({
                success: true,
                message: "Password Updated Successfully"
            })

        }catch(error){
            return next(error)
        }
        
    }catch(err) {
        next(err)
    }
}


export const getAuthUser = async (req, res, next) => {
    try{    
        const id = req.user.userId; 

        const user = await UserModel.findOne({_id: id});
        user.password = undefined;

        if(!user) return next("Username not found");

        res.status(200).send({
            success: true,
            user
        })
    }catch(error){
        next("Auth Failed: " + error)
    }
} 
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const register = async (req, res, next) => {
    try{
        const { username, email, password, profile } = req.body;

        // Validation
        if(!username) return next("Username is required!");
        if(!email) return next("Email is required!");
        if(!password) return next("Password is required!");
        if(!password.length < 6) return next("Password must be greater than 6 characters!");

        // Checking existing username
        const usernameExist  = await UserModel.findOne({ username });
        if(usernameExist){
            return next("Username already exists, Please try another one.")
        }

        // Checking existing email
        const emailExist  = await UserModel.findOne({ email });
        if(emailExist){
            return next("Email already in use.")
        }

        // Hashing password
        if(password){
            bcrypt.hash(password, 10)
                .then(hashPass => {

                    const user = UserModel.create({
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
                            email: user.email,
                            profile: user.profile
                        }
                    })

                }).catch(err => {
                    next("Unable to create account")
                })
        }



    }
    catch(error){
        next("Unable to create account")
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
            return next("User not found")
        }else{
            bcrypt.compare(password, user.password)
            .then((passCheck) => {
                if(!passCheck) return next("Invalid Credentials")

                // Generating jwt token
                const token = JWT.sign({
                    userId: user._id,
                    username: user.username
                }, process.env.JWT_SECRET, { expiresIn: "24h"})

                return res.status(200).send({
                    success: true,
                    message: "Login success",
                    user: {
                        username: user.username,
                        email: user.email
                    },
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


export const resetMail = async (req, res) => {
    res.send("Hello")
}

export const authenticate = async (req, res) => {
    res.send("Hello")
}

export const generateOTP = async (req, res) => {
    res.send("Hello")
}

export const verifyOTP = async (req, res) => {
    res.send("Hello")
}

export const createResetSession = async (req, res) => {
    res.send("Hello")
}


export const resetPassword = async (req, res) => {
    res.send("Hello")
}
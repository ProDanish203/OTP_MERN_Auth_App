import UserModel from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    try{
        const { username } = req.method == "GET" ? req.query : req.body;

        // Check if the user exists
        const user = await UserModel.findOne({ username });
        if(!user) return res.status(404).send({
            success: false,
            message: "User not found",
            error: "User not found"
        })

        next();
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: "Authentication Error",
            err
        })
    }
}
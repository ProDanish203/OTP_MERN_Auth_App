import UserModel from "../models/UserModel";

export const verifyUser = async (req, res, next) => {
    try{
        const { username } = req.method == "GET" ? req.query : req.body;

        // Check if the user exists
        const user = await UserModel.findOne({ username });
        // if()
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: "Authentication Error",
            err
        })
    }
}
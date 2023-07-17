import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return next("Authentication Failed!")

        const payload = await JWT.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        next();

    }
    catch(err){
        next("Authentication Failed!")
    }

}

export default userAuth;
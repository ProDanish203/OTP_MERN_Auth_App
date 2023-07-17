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



    // const authHeader = req.headers.authorization;
    // if(!authHeader || !authHeader.startsWith('Bearer')){
    //     return next("Authentication Failed!")
    // }

    // const token = authHeader.split(' ')[1];

    // try{
    //     const payload = JWT.verify(token, process.env.JWT_SECRET);

    //     req.body.user = {userId: payload.userId}

    //     next()
    // }
    // catch(error){
    //     next("Authentication Failed!")
    // }

}

export default userAuth;
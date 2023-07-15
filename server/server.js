import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connect from "./Config/db.js";
import authRoute from "./Routes/AuthRoute.js";
dotenv.config();

const app = express();

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"));
app.disable('x-powered-by')

// Routes
app.use("/api/v1/auth", authRoute)


const port = process.env.PORT

connect().then(() => {
    try{
        app.listen(port, () => {
            console.log(`Server is listening live on port:${port}`)
        })
    }
    catch(error){
        console.log("Error while running the server")
    }
}).catch(() => {
    console.log("Database Connection Failed")
})


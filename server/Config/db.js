import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connect = async () => {
    // const mongo = await MongoMemoryServer.create();
    // const getUri = mongo.getUri();

    // mongoose.set("strictQuery", true);
    // const db = mongoose.connect(getUri);
    // console.log("Database Connected successfully");
    // return db;

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connected Successfully: ${mongoose.connection.host}`)
    }
    catch(e){
        console.log("Database Connection Error: \n", e)
    }
}

export default connect;
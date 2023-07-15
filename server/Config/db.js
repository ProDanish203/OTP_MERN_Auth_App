import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connect = async () => {
    const mongo = await MongoMemoryServer.create();
    const getUri = mongo.getUri();

    mongoose.set("strictQuery", true);
    const db = mongoose.connect(getUri);
    console.log("Database Connected successfully");
    return db;
}

export default connect;
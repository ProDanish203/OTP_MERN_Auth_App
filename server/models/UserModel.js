import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Userame is required"],
        unique: [true, "Username is taken"]
    },
    email: {
      type: String, 
      required: [true, "Email is required"],  
      unique: [true, "Email already in use"]

    },
    password: {
        type: String, 
        required: [true, "Password is required"],
        unique: false
    },
    firstName: String,
    lastName: String,
    mobile: Number,
    address: String, 
    profile: String
    
},
{timestamps: true}
)


export default mongoose.model("User", UserSchema)
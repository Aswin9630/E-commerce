import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const MONGO_URL=process.env.MONGODB_URI

const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("Connected to MONGODB"); 
    })
    await mongoose.connect(`${MONGO_URL}/AK_TRENDZ`);
}

export default connectDB; 
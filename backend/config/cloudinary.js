import { v2 as cloudinary } from "cloudinary"

const {CLOUDINARY_NAME ,CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET_KEY } = process.env

const connectCloudinary = async ()=>{
    cloudinary.config({
        cloud_name:CLOUDINARY_NAME,
        api_key:CLOUDINARY_API_KEY,
        api_secret:CLOUDINARY_API_SECRET_KEY
    })
}

export default connectCloudinary;
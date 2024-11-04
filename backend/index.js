import express from "express"
import cors from "cors"
import connectDB from "./config/mongoDB.js"
import dotenv from "dotenv"
import connectCloudinary from "./config/cloudinary.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('api working')
})

app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`))



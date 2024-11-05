import express from "express"
import cors from "cors"
import connectDB from "./config/mongoDB.js"
import dotenv from "dotenv"
import connectCloudinary from "./config/cloudinary.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoute.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)

app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`))



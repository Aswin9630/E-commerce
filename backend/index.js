import express from "express"
import cors from "cors"
import connectDB from "./config/mongoDB.js"
import dotenv from "dotenv"
import connectCloudinary from "./config/cloudinary.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoute.js"
import productRoutes from "./routes/productRoute.js"
import cartRoutes from './routes/cartRoute.js' 
import orderRoutes from './routes/orderRoute.js' 

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())
 
app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)

app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`))



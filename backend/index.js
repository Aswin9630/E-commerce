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

const allowedOrigins = [
    "https://aktrendz-admin.vercel.app",
    "https://aktrendz-frontend.vercel.app"
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allows cookies to be sent if needed
  };

const app = express()
const PORT = process.env.PORT || 3000

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors(corsOptions))
 
app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)

app.get('/', (req,res) => res.send("API working") )

app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`))



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

const allowedOrigins = process.env.NODE_ENV === "production"

  ? [process.env.FRONTEND_DEPLOY, process.env.ADMIN_DEPLOY]
  :[process.env.FRONTEND_LOCAL, process.env.ADMIN_LOCAL];
 
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
    preflightContinue: false, 
    optionsSuccessStatus: 204,
  };

const app = express() 
const PORT = process.env.PORT || 3000

connectDB()
connectCloudinary()


app.use(cors(corsOptions)) 
app.use(express.json())
app.get('/', (req,res) => res.send("API working") )

app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)


app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`))



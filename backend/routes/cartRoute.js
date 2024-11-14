import express from "express"
import { addToCart, getUserCart, updateCart } from "../controllers/cartController.js"
import authUser from "../middleware/authUser.js"
const router = express.Router()

router.post('/add',authUser,addToCart)
router.post('/update',authUser,updateCart)
router.post('/get',authUser,getUserCart)

export default router
import express from 'express'
const router = express.Router()
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js'
import { allOrders, placeOrderCOD, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controllers/orderController.js';

//admin
router.post('/list',adminAuth,allOrders)
router.post('/status',adminAuth,updateStatus)

//payment 
router.post('/cod',authUser,placeOrderCOD)
router.post('/razorpay',authUser,placeOrderRazorpay)

//user 
router.post('/userorders',authUser,userOrders)

//verifyPayment
router.post('/verifyRazorpay',authUser,verifyRazorpay)

export default router;
import express from 'express'
const router = express.Router()
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js'
import { allOrders, placeOrderCOD, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders } from '../controllers/orderController.js';

//admin
router.post('/list',adminAuth,allOrders)
router.post('/status',adminAuth,updateStatus)

//payment 
router.post('/cod',authUser,placeOrderCOD)
router.post('/stripe',authUser,placeOrderStripe)
router.post('/razorpay',authUser,placeOrderRazorpay)

//user
router.post('/userorders',authUser,userOrders)

export default router;
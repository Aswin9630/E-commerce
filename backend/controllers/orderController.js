import orderModel from '../models/orderSchema.js'
import userModel from '../models/userSchema.js'
import Razorpay from 'razorpay'

const {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} = process.env

const razorpayInstance = new Razorpay({
    key_secret:RAZORPAY_KEY_SECRET,
    key_id:RAZORPAY_KEY_ID
})

const currency = 'inr'


const placeOrderCOD = async(req,res)=>{
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate( userId, { cartData:{} })
        res.json({success:true, message:"Order Placed"})


    } catch (error) {
        console.log(error);
        res.json({ success:false, message:error.message})
        
    }
}


const placeOrderRazorpay = async(req,res)=>{
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'Razorpay',
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        const razorpayOrder=  await razorpayInstance.orders.create(options)
        res.json({ success:true , order:razorpayOrder })


    } catch (error) {
        console.log(error);
        res.json({ success:false, message:error.message})
    }
}

const verifyRazorpay = async (req,res)=>{
    try {
        const { userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate( orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate( userId, { cartData: {} })
            res.json({ success:true, message: 'Payment Successful'})
        }else{
            res.json({ success:false, message:"Payment Failed" })
        }
         

    } catch (error) {
        console.log(error);
        res.json({ success:false, message:error.message})
    }
}

const allOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({})
        res.json({ success:true, orders })
        
    }catch(error){
        console.log(error);
        res.json({ success:false, message:error.message})
    }
} 

const userOrders = async(req,res)=>{
    try {
        const { userId } = req.body
        const orders = await orderModel.find({userId})
        res.json({ success:true, orders})

    } catch (error) {
        console.log(error);
        res.json({ success:false, message:error.message})
    }
}

const updateStatus = async(req,res)=>{
    try {
        const {orderId , status } =req.body;
        await orderModel.findByIdAndUpdate(orderId, {status} )
        res.json({ success:true , message:"Staus Updated"})
    } catch (error) {
        console.log(error);
        res.json({ success:false, message:error.message})
    }
}

export { placeOrderCOD, placeOrderRazorpay, verifyRazorpay, allOrders, userOrders, updateStatus }
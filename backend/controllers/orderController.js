import orderModel from '../models/orderSchema.js'
import userModel from '../models/userSchema.js'
import Razorpay from 'razorpay'

const {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} = process.env

const razorpayInstance = new Razorpay({
    key_secret:RAZORPAY_KEY_SECRET,
    key_id:RAZORPAY_KEY_ID
})

const currency = 'inr'
const delivery_fee = 30

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

// const placeOrderStripe = async(req,res)=>{
//     try {
//         const { userId, items, amount, address } = req.body
//         const { origin } = req.headers

//         const orderData = {
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod:'Stripe',
//             payment:false,
//             date:Date.now()
//         }

//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         const line_items = items.map((item)=>({
//                 price_data : {
//                    currency:currency,
//                    product_data:{
//                     name:item.name
//                    },
//                    unit_amount:item.price * 100
//                 },
//                 quantity:item.quantity
//         }))

//         line_items.push({
//             price_data : {
//                 currency:currency,
//                 product_data:{
//                  name:'Deivery charge'
//                 },
//                 unit_amount:delivery_fee * 100
//              },
//              quantity:1
//         })

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode:'payment',
//         })

//         res.json({ success:true , session_url:session.url})


//     } catch (error) {
//         console.log(error);
//         res.json({ success:false, message:error.message})
//     }
// }

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

export { placeOrderCOD, placeOrderRazorpay, allOrders, userOrders, updateStatus }
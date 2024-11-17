import { useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { backendUrl, currency } from '../utils/constants'
import {assets} from '../assets/admin_assets/assets.js'

const Orders = ({token}) => {

  const [orders , setOrders ] = useState([])

  useEffect(()=>{
    fetchAllOrders()
  },[token])

  const fetchAllOrders = async()=>{

    if(!token){
      return null; 
    }

    try {
      
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { Authorization: `Bearer ${token}` } })
      if(response.data.success){
        setOrders(response.data.orders)
      }else{
        toast.error(response.data.message)
      }   

    } catch (error) {
      console.error(error);
      toast.error(error.message)
      
    }
  }

  const statusHandler = async (event,orderId)=>{
    try {
      const response = await axios.post(backendUrl+'/api/order/status',{ orderId, status: event.target.value },{headers:{Authorization:`Bearer ${token}`}})
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message)
      
    }
  }
  return (
    <div>
      <h3>Order Page</h3>

      <div>
        {
          orders.map((order,index)=>(
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
                <img src={assets.parcel_icon} className='w-12' alt="" />
                <div>
                   <div>
                      { order.items && order.items.length > 0 ? (
                          order.items.map((item,index)=>(
                            <p key={index} className='py-0.5'>{item.name} x {item.quantity} <span>{item.size}</span></p>
                          ))
                        ):(
                          <p>No items</p>
                        )
                      }
                    </div>
                    <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                    <div>
                      <p>{order.address.street + ", "}</p> 
                      <p>{order.address.city + ", " +order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p> 
                    </div>
                    <p>{order.address.phone}</p>
                </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleString( )}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div> 
          ))
        }
      </div>
    </div>
  )
}

export default Orders
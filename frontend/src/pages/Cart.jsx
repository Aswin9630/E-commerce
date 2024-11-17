import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from "../components/Title"
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/cartTotal';
import {useNavigate} from "react-router-dom"

const Cart = () => {

  const {products,cartItems,currency,updateQuantity} = useContext(ShopContext);

  const [cartData,setCartData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate()


  useEffect(()=>{

    if(products.length > 0){
      const tempData = [];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            tempData.push({
              _id : items,
              size: item,
              quantity:cartItems[items][item]
            })
          }
        }
      }
  
      setCartData(tempData);
    }

  },[cartItems,products])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={"YOUR"} text2={"CART"}/>
      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productData = products.find((product)=>product._id === item._id)
            return(
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex gap-5 items-start'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="product-image" />
                  <div>
                    <p className='font-medium text-sm sm:text-lg'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e)=>e.target.value === '' || e.target.value === '0' ? 'null' : updateQuantity(item._id,item.size,Number(e.target.value))} className='border text-center max-w-10 sm:max-w-15 px-1 py-1 sm:px-2' type="number" defaultValue={item.quantity} min={1}/>
                <img onClick={()=>{
                 setSelectedItem({id:item._id , size:item.size })
                 setShowModal(true);
                }} className='w-4 sm:w-5 mr-4 cursor-pointer' src={assets.bin_icon} alt="delete-icon" />
                {
                  showModal && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                      <div className='bg-white p-6 rounded shadow-md'>
                        <p>Are you sure, you want delete this item from cart?</p>
                        <div className='flex justify-end mt-4'>
                          <button onClick={()=>{
                            updateQuantity(selectedItem.id , selectedItem.size, 0 )
                            setShowModal(false);
                          }} className='bg-black text-white px-4 py-2 mr-2 rounded'>Confirm</button>
                          <button onClick={()=>setShowModal(false)}
                              className='bg-gray-300 px-4 py-2 rounded'>Cancel</button>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            )
          })
        }
      </div>  
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div className='w-full text-center'>
            <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm px-8 py-3 my-8'>Proceed To CheckOut</button>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default Cart
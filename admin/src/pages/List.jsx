import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../utils/constants'
import { toast } from 'react-toastify'
import {currency} from '../utils/constants'

const List = ({token}) => {
  const [ list, setList ] =useState([])
  const [ showConfirm, setShowConfirm ] =useState(false)
  
  useEffect(()=>{
    fetchList()
  },[]);

  const fetchList = async ()=>{
    try {
      const response = await axios.get(backendUrl+'/api/product/list')
      if(response.data.success){
        setList(response.data.product)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) =>{
    try {
      const response = await axios.post(backendUrl+'/api/product/remove',
        {id},{ header:{Authorization:`Bearer ${token}`}}
      )
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.error(error);
      toast.error(error.message)
      
    }
  }


  return (
    <>
    <p className='mb-2'>All Products</p>
    <div className='flex flex-col gap-2'>

      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>
        {
          list.map((item,index)=>(
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center border text-sm py-1 px-2'>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>{
                setShowConfirm(item._id)
              }} className='text-right md:text-center text-lg cursor-pointer'>X</p>
              {
                showConfirm === item._id && (
                  <div  className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-20'>
                  <div className='bg-white shadow-lg p-6 rounded-md'>
                   <p className='text-base'>Are you sure? You want to Delete this product</p>
                    <div className='flex justify-between mt-4'>
                      <button onClick={async()=>{
                        await removeProduct(item._id)
                        setShowConfirm(false)
                      }} className='bg-green-500 text-white px-4 py-2 rounded-lg mr-4'>Yes</button>
                      <button onClick={()=>setShowConfirm(false)} className='bg-red-500 text-white px-4 py-2 rounded-lg mr-4'>No</button>
                    </div>
                  </div>  
                  </div>         
                )
              }
            </div>
          ))
        }
    </div>
    </>
  )
}

export default List
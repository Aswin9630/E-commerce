import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('Men')
  const [subCategory,setSubCategory] = useState('Topwear')
  const [bestseller,setBestseller] = useState(false)
  const [sizes,setSizes] = useState([])

  const handleSubmit =async (e)=>{
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes)) 

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/product/add', formData, {
                        headers:{Authorization: `Bearer ${token}` }
    })

      if (response.data.success) {
          toast.success(response.data.message)
          setName('')
          setDescription('')
          setPrice('')
          setImage1(false)
          setImage2(false)
          setImage3(false)
          setImage4(false)
      }else{
        toast.error(response.data.message)
      }  
     
    } catch (error) {
      console.error(error);
      toast.error(error.message)
      
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full items-start'>
      <div>
        <p className='mb-2'>Image Upload</p>
        <div className='flex gap-2'>
          <label className='cursor-pointer' htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="img" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
          </label>
          <label className='cursor-pointer' htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="img" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
          </label>
          <label className='cursor-pointer' htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="img" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
          </label>
          <label className='cursor-pointer' htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="img" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='outline-none w-full border max-w-[500px] px-3 py-2 border-gray-300' type="text" placeholder='Product name' required/>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='outline-none w-full border max-w-[500px] px-3 py-2 border-gray-300' type="text" placeholder='Write about product' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-5 sm:gap-8 w-full'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Subcategory</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='outline-none px-3 py-2 w-full sm:w-[120px] border' type="Number" placeholder='₹' />
        </div>
      </div>

      <div>
        <p className='mb-2'>Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=>setSizes(prev=>prev.includes('S') ? prev.filter( item => item !== 'S') :[...prev,"S"])}>
            <p className={`${sizes.includes('S') ? "bg-green-500 text-white" : "bg-slate-200"} px-2 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes('M') ? prev.filter( item => item !== 'M') :[...prev,"M"])}>
            <p className={`${sizes.includes('M') ? "bg-green-500 text-white" : "bg-slate-200"} px-2 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes('L') ? prev.filter( item => item !== 'L') :[...prev,"L"])}>
            <p className={`${sizes.includes('L') ? "bg-green-500 text-white" : "bg-slate-200"} px-2 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes('XL') ? prev.filter( item => item !== 'XL') :[...prev,"XL"])}>
            <p className={`${sizes.includes('XL') ? "bg-green-500 text-white" : "bg-slate-200"} px-2 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes('XXL') ? prev.filter( item => item !== 'XXL') :[...prev,"XXL"])}>
            <p className={`${sizes.includes('XXL') ? "bg-green-500 text-white" : "bg-slate-200"} px-2 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-3'>
        <input onChange={()=>setBestseller(prev => Boolean(!prev) )} checked={bestseller} type="checkbox" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button className='bg-black text-white mt-4 px-3 py-2 w-24'>ADD</button>
    </form>
  )
}

export default Add
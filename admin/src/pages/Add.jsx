import React from 'react'
import { assets } from '../assets/admin_assets/assets'

const Add = () => {
  return (
    <form className='flex flex-col gap-3 w-full items-start'>
      <div>
        <p className='mb-2'>Image Upload</p>
        <div className='flex gap-2'>
          <label className='cursor-pointer' htmlFor="image1">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type="file" id="image1" hidden/>
          </label>
          <label className='cursor-pointer' htmlFor="image2">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type="file" id="image2" hidden/>
          </label>
          <label className='cursor-pointer' htmlFor="image3">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type="file" id="image3" hidden/>
          </label>
          <label className='cursor-pointer' htmlFor="image4">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input type="file" id="image4" hidden/>
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input className='outline-none w-full border max-w-[500px] px-3 py-2 border-gray-300' type="text" placeholder='Product name' required/>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea className='outline-none w-full border max-w-[500px] px-3 py-2 border-gray-300' type="text" placeholder='Write about product' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-5 sm:gap-8 w-full'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Subcategory</p>
          <select className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Price</p>
          <input className='outline-none px-3 py-2 w-full sm:w-[120px] border' type="Number" placeholder='30' />
        </div>
      </div>

      <div>
        <p className='mb-2'>Sizes</p>
        <div className='flex gap-3'>
          <div>
            <p className='bg-slate-200 px-2 py-1 cursor-pointer'>S</p>
          </div>
          <div>
            <p className='bg-slate-200 px-2 py-1 cursor-pointer'>M</p>
          </div>
          <div>
            <p className='bg-slate-200 px-2 py-1 cursor-pointer'>L</p>
          </div>
          <div>
            <p className='bg-slate-200 px-2 py-1 cursor-pointer'>XL</p>
          </div>
          <div>
            <p className='bg-slate-200 px-2 py-1 cursor-pointer'>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-3'>
        <input type="checkbox" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button className='bg-black text-white mt-4 px-3 py-2 w-24'>ADD</button>
    </form>
  )
}

export default Add
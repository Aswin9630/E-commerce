import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import {useParams} from "react-router-dom"
import { assets } from '../assets/frontend_assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const {products, currency} = useContext(ShopContext);
  const {productId} = useParams();
  const [productData , setProductData] = useState([]);
  const [productDataImage , setProductDataImage] = useState([]);
  const [productDataSizes , setProductDataSizes] = useState([]);
  const [image , setImage] = useState('');
  const [size,setSize] = useState('')


  useEffect(()=>{
    fetchProductData()
  },[productId,products])

  const fetchProductData = async()=>{
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
        setProductDataImage(item.image);
        setProductDataSizes(item.sizes)
        setImage(item.image[0])
        return null;
      }
    })
  }

  
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%]'>
            {
              productDataImage.map((item,index)=>(
                <img onClick={()=>setImage(item)} key={index} src={item} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="image" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>

      <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className='w-3'/>
            <img src={assets.star_icon} alt="" className='w-3'/>
            <img src={assets.star_icon} alt="" className='w-3'/>
            <img src={assets.star_icon} alt="" className='w-3'/>
            <img src={assets.star_dull_icon} alt="" className='w-3'/>
            <p className='pl-2 text-sm'>(102)</p>
          </div>
          <p className='font-medium text-3xl mt-5'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='mt-5'>
            <p className='font-medium'>Select Sizes:</p>
            <div className='flex gap-2 mt-1'>
              {
                productDataSizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} key={index} className={`border px-4 py-2 bg-gray-100 ${item == size ? 'border-green-600 border-4' : ''}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <button className='bg-black text-white text-sm px-8 py-2 mt-3 active:bg-gray-700'>Add To Cart</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-gray-500 text-sm mt-5 flex flex-col gap-1'>
            <p>100% original product</p>
            <p>Cash on delivery available</p>
            <p>Easy return and exchange policy within 7days</p>
          </div>
      </div>
      </div>
      <div className='mt-20'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className='border px-5 py-3 text-sm'>Reviews (87)</p>
          </div>
          <div className='flex flex-col gap-4 text-sm text-gray-500 px-5 py-2 border'>
            <p>Enjoy a broad collection of clothing that blends comfort with style, perfect for all seasons. With a focus on premium fabric and detailed craftsmanship, our store offers easy returns, secure transactions, and quick delivery to enhance your online shopping experience.</p>
            <p>Shop stylish apparel that suits every occasion, from casual basics to formal wear, all in one convenient online store. We offer detailed size guides, customer reviews, and a user-friendly return policy to make your shopping easy and worry-free.</p>
            </div>
      </div>

        <RelatedProduct category={productData?.category} subCategory={productData?.subCategory}/>

    </div>
  ) : (
  <div className='opacity-0'></div>
  )
}

export default Product
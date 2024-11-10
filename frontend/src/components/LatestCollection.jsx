import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([])

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])
    
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1='LATEST' text2='COLLECTIONS'/>
            <p className='text-xs sm:text-sm md:text-base text-slate-400 font-serif'>
            "Fresh arrivals to elevate your wardrobe – shop the newest trends today!"
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((items,index)=>(
                    <ProductItem key={index} id={items._id} name={items.name} image={items.image} price={items.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);    

    useEffect(()=>{
        const bestProduct = products.filter((item)=>item.bestseller);
        setBestSeller(bestProduct)
    },[products])

  return (
    <div>
        <div className='text-center text-3xl py-9'>
            <Title text1="BEST" text2="SELLERS"/>
            <p className='text-xs sm:text-sm md:text-base text-gray-400 font-serif'>
                "Discover the styles everyone’s loving – our top picks, just for you!"
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((items,index)=>(
                    <ProductItem key={index} id={items._id} name={items.name} image={items.image} price={items.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller
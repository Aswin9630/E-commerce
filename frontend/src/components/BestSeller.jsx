import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);    
    
    useEffect(()=>{
        if(products.length > 0){
            const bestProduct = products.filter((item)=>item.bestseller);            
            setBestSeller(bestProduct)
        }
    },[products])

   if(bestSeller.length === 0){
    return null;
   }

  return (
   <div> 
      
         <div className='text-center text-3xl py-9'>
            <Title text1="BEST" text2="SELLERS"/>
            <p className='text-xs sm:text-sm md:text-base text-gray-400 font-serif'>
                "Discover the styles everyones loving  our top picks, just for you!"
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name}  price={item.price}/>
                ))
            }
        </div>
      
    </div>
  )
}

export default BestSeller
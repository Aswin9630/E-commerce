import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

const Collection = () => {
  const {products} = useContext(ShopContext);
  const [showFilters,setShowFilters] = useState(false);
  const [filterProduct,setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory,setSubcategory] = useState([]);
  const [sortType,setSortType] = useState('relevant');

  useEffect(()=>{
    applyFilter()
  },[category,subCategory])

  useEffect(()=>{
    sortProduct()
  },[sortType])

  const handleCategory = (e)=>{
    if (category.includes( e.target.value )){
      setCategory( prev => prev.filter( item => item !== e.target.value))
    }else{
      setCategory( prev => [...prev,e.target.value] )
    }
  }

  const handleSubCategory = (e)=>{
    if (subCategory.includes( e.target.value )){
      setSubcategory( prev => prev.filter( item => item !== e.target.value))
    }else{
      setSubcategory( prev => [...prev,e.target.value] )
    }
  }

  const applyFilter = () =>{

    let productCopy = products.slice();

    if(category.length > 0){
      productCopy = productCopy.filter( item => category.includes(item.category) )
    }
    if(subCategory.length > 0){
      productCopy = productCopy.filter( item => subCategory.includes(item.subCategory) )
    }

    setFilterProduct(productCopy)
  }

  const sortProduct = () =>{
    let fpCopy = filterProduct.slice()

    switch(sortType){
      case "low-high" :
        setFilterProduct( fpCopy.sort((a,b)=>(a.price - b.price)))
        break;
      case "high-low" :
        setFilterProduct( fpCopy.sort((a,b)=>(b.price - a.price)))
        break;
      default:
        applyFilter();
        break;

    }
  }

 

  return (
    <div className='flex flex-col gap-1 sm:flex-row sm:gap-10 pt-10 border-t'>
      
        <div className='min-w-60'>
          <p onClick={()=>setShowFilters(!showFilters)} className='my-2 text-xl flex  items-center gap-2 cursor-pointer'>FILTERS
            <img className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="Dropdown-Icon" />
          </p>
         
          <div className={`border border-gray-300 pl-3 mt-6 ${showFilters ? '' :'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Men'} onChange={handleCategory} />Men
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Women'} onChange={handleCategory} />Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Kids'} onChange={handleCategory} />Kids
              </p>
            </div>
          </div>
          <div className={`border border-gray-300 pl-3 my-5 ${showFilters ? '' :'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Topwear'} onChange={handleSubCategory}/>Topwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={handleSubCategory}/>Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Winterwear'} onChange={handleSubCategory}/>Winterwear
              </p>
            </div>
          </div>
        </div>
      

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"}/>
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by:Relevant</option>
            <option value="low-high">Sort by:Low-High</option>
            <option value="high-low">Sort by:High-Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProduct.map((items,index)=>(
              <ProductItem key={index} name={items.name} id={items._id} price={items.price} image={items.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
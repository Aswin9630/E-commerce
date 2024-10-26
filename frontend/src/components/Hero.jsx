import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  return (
    <div className='p-2 flex flex-col sm:flex-row border border-gray-300'>
         <img src={assets.hero_img} alt="hero-img" />
     
    </div>
  )
}

export default Hero
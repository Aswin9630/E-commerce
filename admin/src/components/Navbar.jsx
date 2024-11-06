import React from 'react'
import {assets} from "../assets/admin_assets/assets"

const Navbar = () => {
  return (
    <div className='flex justify-between py-2 px-[4%]'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button className='bg-gray-600 text-white h-11 px-5 py-2 my-2 sm:my-2 sm:px-7 sm:py-2 rounded-full text-sm sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-5 font-medium'>
      <img src={assets.logo} className='w-32 h-28' alt='logo'/>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-600'>
        <NavLink to='/' className='flex flex-col gap-1 items-center'>
          <p>HOME</p>
          <hr className='bg-gray-700 w-2/4 h-[1.9px] hidden'/>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col gap-1 items-center'>
          <p>COLLECTIONS</p>
          <hr className='bg-gray-700 w-2/4 h-[1.9px] hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col gap-1 items-center'>
          <p>ABOUT</p>
          <hr className='bg-gray-700 w-2/4 h-[1.9px] hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col gap-1 items-center'>
          <p>CONTACT</p>
          <hr className='bg-gray-700 w-2/4 h-[1.9px] hidden'/>
        </NavLink>
      </ul>
      <div className='flex gap-6 items-center'>
        <img src={assets.search_icon} className='w-5 cursor-pointer' alt="search-icon" />

        <div className='group relative'>
          <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="profile-icon" />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-600 rounded-lg'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>
        <Link to='/cart' className='relative'>
        <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart-icon" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>5</p>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import {assets} from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col justify-around sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-14 text-sm border p-5'>
            <div>
                <img src={assets.logo} className='w-24 mb-5' alt="" />
                <p className='w-full md:w-2/3 text-gray-500'>"Redefining fashion with quality pieces that fit your style, comfort, and budget."</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='font-medium text-xl mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-234-565-789</li>
                    <li>contact@aktrendz.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr/>
            <p className='py-5 text-sm text-center text-gray-400'>Copyright 2024@ aktrendz.com - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
import React from 'react'
import Title from '../components/Title'
import NewsLetter from "../components/NewsLetter"
import { assets } from '../assets/frontend_assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 bborder-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='text-gray-600 font-semibold text-xl'>Our Store</p>
          <p className='text-gray-500'>456 Trendy Lane <br />Sector 12, Dwarka <br />New Delhi, Delhi 110078 <br />India</p>
          <p className='text-gray-500'>Phone: +91 98765 43210 <br />Email: support@aktrendz.com</p>
          <p className='text-gray-600'>Careers at AKTRENDZ</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetter/>
    </div>
  )
}

export default Contact
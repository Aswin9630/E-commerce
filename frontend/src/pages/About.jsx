import React from 'react'
import Title from "../components/Title"
import NewsLetter from "../components/NewsLetter"
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to our e-commerce clothing store, where fashion meets convenience! We bring you a curated collection of trendy, high-quality clothing for all styles and occasions. Our mission is to offer a seamless shopping experience, from browsing to delivery, with a focus on sustainable practices and customer satisfaction. With a range of designs that balance comfort, elegance, and affordability, we’re here to help you express yourself confidently. Join us on this journey to redefine style—whether you’re looking for everyday essentials or statement pieces, our store has something special for everyone!</p>
          <p></p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to redefine the online shopping experience by offering high-quality, stylish clothing that empowers individuals to express their unique identity. We are committed to sustainability, using eco-friendly materials and ethical practices in every step of our production. Through exceptional customer service and a carefully curated collection, we strive to make fashion accessible, enjoyable, and meaningful for everyone. We believe in creating a positive impact, not only through our products but also by supporting a community that values both style and substance.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We are dedicated to providing high-quality products, with each piece carefully inspected to meet our standards for durability, comfort, and style.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>From easy navigation to fast, reliable shipping, we’re here to bring convenience right to your doorstep.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our customers are at the heart of everything we do, and we’re committed to providing friendly, responsive support at every stage of your shopping experience.</p>
        </div>
      </div>

      <NewsLetter/>
    </div>
  )
}

export default About
import React from 'react'

const NewsLetter = () => {

    const handleSubmit = (e)=>{
        e.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off🎈</p>
        <form onSubmit={handleSubmit} className='w-full sm:w-1/2 items-center flex gap-3 mx-auto my-6 pl-3 border'>
            <input className='w-full sm:flex-1 outline-none text-gray-500' type="email" placeholder='Enter your email' required/>
            <button  className='bg-black text-white font-medium text-xs py-4 px-10' type='submit'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter
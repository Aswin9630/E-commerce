import React, { useState } from 'react'

const Login = () => {
  const [isSignIn , setIsSignIn ] = useState(true)


  const toggleSignIn = () =>{
    setIsSignIn(!isSignIn)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{ isSignIn ? "Login" : "SignUp"}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {!isSignIn && <input className='w-full px-3 py-2 border border-gray-600 outline-none' type="text" placeholder='Name' required/>}
      <input className='w-full px-3 py-2 border border-gray-600 outline-none' type="email" placeholder='Email' required/>
      <input className='w-full px-3 py-2 border border-gray-600 outline-none' type="password" placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
       { isSignIn ? (
        <p className='cursor-pointer'>Forgot Your Password</p>
       ):(
        <p className='cursor-pointer'>Already Registered</p>
       )}
     {isSignIn ? (
       <p className='cursor-pointer text-blue-500 ' onClick={toggleSignIn}><span className='text-black'>New User?</span>Create Account</p>
     ) : (
      <p className='cursor-pointer  text-blue-500' onClick={toggleSignIn}>SignIn</p>
     )}
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-2'>{isSignIn ? "Login" : "SignUp"}</button>
    </form>
  )
}

export default Login
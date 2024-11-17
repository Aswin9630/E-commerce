import React, { useState } from 'react'
import axios from "axios"
import { backendUrl } from '../utils/constants'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSubmit =async (e)=>{
        try {
            e.preventDefault()
            const response = await axios.post(backendUrl+'/api/admin',{
                email,password
            })
            
            if(response.data.success){
                setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }
            
            
        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    }


  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-md rounded shadow-lg px-8 py-6 bg-white'>
            <h1 className='text-3xl text-center font-medium text-gray-700'>Admin Panel</h1>
                <form onSubmit={handleSubmit} className='my-5'>
                    <div className='mb-3 min-w-72'>
                        <p className='mb-2 text-sm font-medium text-gray-700'>Email Address</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full border border-gray-300 outline-none rounded-md px-2 py-2' type="email" placeholder='Email@gmail.com' required/>
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='mb-2 text-sm font-medium text-gray-700'>Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full border border-gray-300 outline-none rounded-md px-2 py-2' type="password" placeholder='Enter your password' required/>
                    </div>
                    <button className='bg-black text-white w-full rounded-md py-2 text-base font-semibold'>Login</button>
                </form>
        </div>
    </div>
  )
}

export default Login
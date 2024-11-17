import React, { useState } from 'react'
import {assets} from "../assets/admin_assets/assets"

const Navbar = ({ setToken }) => {

  const [showConfirm, setShowConfirm ] = useState(false)
  return (
    <div className='flex justify-between py-2 px-[4%]'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button onClick={()=>{
          setShowConfirm(true)
        }} className='bg-gray-600 text-white h-11 px-5 py-2 my-2 sm:my-2 sm:px-7 sm:py-2 rounded-full text-sm sm:text-sm'>Logout</button>
        {
          showConfirm && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white shadow-lg p-6 rounded-md'>
                <p className='text-base'>Are you sure? You want to Logout</p>
                <div className='flex justify-between mt-4'>
                  <button onClick={()=>{
                    setToken('')
                    setShowConfirm(false)
                  }} className='bg-black text-white px-4 py-2 rounded-lg mr-4'>Yes</button>
                  <button onClick={()=>setShowConfirm(false)} className='bg-black text-white px-4 py-2 rounded-lg mr-4'>No</button>
                </div>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default Navbar
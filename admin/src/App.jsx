import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <>
        <Navbar/>
        <hr />
        <div className='flex w-full'>
          <Sidebar/>
          <div className='w-[70%] mx-auto text-gray-600 text-base bg-gray-500'>

          </div>
        </div>
      </>
    </div>
  )
}

export default App
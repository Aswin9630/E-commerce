import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='mb-3 inline-flex gap-2 items-center'>
        <p className='text-gray-500 gap-3 flex'>{text1}<span className='text-gray-700 font-medium'>{text2}</span></p>
    </div>
  )
}

export default Title
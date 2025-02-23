import React from 'react'
import Course from './Course'

const Courses = () => {
  return (
    <div className='bg-black'>
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='font-bold text-white text-3xl text-center mb-10'>Courses offered</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <Course/>
                <Course/>
                <Course/>
            </div>
        </div>
    </div>
  )
}

export default Courses
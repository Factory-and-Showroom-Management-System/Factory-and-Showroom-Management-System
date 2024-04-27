import React from 'react'
import {FaBars} from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className='flex justify-between px-4 py-3 ml-64 bg-gray-800'>
        <div className='flex items-center text-x1'>
          
          
        </div>
        <div className='flex item-center gap-x-5'>
          <div className='relative md:w-65'>
            <span className='relative inset-y-0 left-0 flex pl-2 md:absolute ite-center'/>
              <button className='p-1 text-white focus:outline-none md:text-black' ></button>
            
            <input type="text" className='hidden w-full px-4 py-1 pl-12 rounded shadow outline-none md:block'>
              
            </input>
          </div>

        </div>
    </nav>
  )
}

export default Navbar
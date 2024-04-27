import React from 'react'
import { FaCog, FaHome } from "react-icons/fa";


const SalesManagerDashboard = () => {
    return (
        <div>
        
        <div className="fixed w-64 h-full px-4 py-2 bg-gray-800">
          <div className="mb-4 my-">
            
          </div>
          <br/>
          <ul className="mt-3 font-bold text-white">
            <li className="py-2 mb-2 rounded hover:shadow hover:bg-blue-500">
              <a href="" className="px-3">
                <FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />
                Sales Dashboard
              </a>
            </li>
           
              <li className="py-2 mb-2 rounded hover:shadow hover:bg-blue-500">
                <a href="" className="px-3">
                  <FaCog className="inline-block w-6 h-6 mr-2 -mt-2" />
                  Setting
                </a>
              </li>
           
            {/* Add more conditional rendering based on userRole */}
          </ul>
        </div>
    
        
        <div className='w-full h-screen bg-slate-200'>
          <div className=''>
           
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
           
          </div>
          
          
          
        </div>
        </div>
      )
}

export default SalesManagerDashboard
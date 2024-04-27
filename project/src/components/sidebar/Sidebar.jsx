import React from "react";
import { useSelector } from 'react-redux';
import { FaCog, FaHome } from "react-icons/fa";

export const Sidebar = () => {

  return (
    <div className="fixed w-64 h-full px-4 py-2 bg-gray-800">
      <div className="mb-4 my-">
        
      </div>
      <br/>
      <ul className="mt-3 font-bold text-white">
        <li className="py-2 mb-2 rounded hover:shadow hover:bg-blue-500">
          <a href="" className="px-3">
            <FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />
            Dashboard
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
  );
};

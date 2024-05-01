import React from "react";
import image from "../../assets/login/mainLogo.png";
import { useState, useEffect } from "react";
  
const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        const timeString = now.toLocaleTimeString('en-US', {
            hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
        });
        setCurrentDateTime(`${dateString}, ${timeString}`);
    }, 1000);
    return () => clearInterval(timer);
}, []);

  
  return (
    <div className="flex justify-between p-0 py-2 bg-[#cdf8da] border-b-2 ">
      <div className="flex">
      <img src={image} className="h-10 mt-2" alt="Flowbite Logo"  />
      
      <span className="flex self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        <div>
        DOLPHIN ECO PACK  
        </div>
        <div className="pt-1 pl-10 text-sm">
       {currentDateTime}
        </div>
        
      
       
      </span>
      </div>
      <div className="pt-2 pl-1 text-3xl text-blue-500">
     <h1></h1> 
      </div>
      <button className="px-4 py-2 font-bold rounded hover:bg-blue-700">
        profile
      </button>
     
    </div>
  );
};

export default Navbar;

import React from "react";
import image from "../../assets/login/mainLogo.png";
  
const Navbar = () => {
  return (
    <div className="flex justify-between p-5 py-2 bg-[#e5f8fa] border-b-2 ">
      <div className="flex">
      <img src={image} className="h-10 mt-2" alt="Flowbite Logo"  />
      
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        DOLPHIN ECO PACK (PVT) LYD
      </span>
      </div>
      <button className="px-4 py-2 font-bold rounded hover:bg-blue-700">
        profile
      </button>
     
    </div>
  );
};

export default Navbar;
 
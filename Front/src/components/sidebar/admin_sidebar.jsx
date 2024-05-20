import { Sidebar } from "flowbite-react";
import {
  HiShoppingBag,
  HiUser,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useState } from "react";
import { GoDatabase } from "react-icons/go";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";



export function Admin_Sidebar() {

  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [productClicked, setProductClicked] = useState(false);
  const [materialClicked, setMaterialClicked] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [logoutClicked, setLogoutClicked] = useState(false);
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleDashboardClick = () => {
    setDashboardClicked(true);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
     // Ensure other button color is reset
  };

  const handleProductClick = () => {
    setProductClicked(true);
    setDashboardClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
  };

  const handleMaterialClick = () => {
    setProductClicked(false);
    setDashboardClicked(false);
    setMaterialClicked(true);
    setLogoutClicked(false);
  };

  const handleSignoutClick = () => {
    setShowModal(true); // Show the modal on log out button click
  };

  const handleSignoutConfirm = async () => {
    try {
  
      const res = await fetch("http://localhost:3000/users/signout", {
        method: "POST",
        
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        
      }else {
        dispatch(signOutSuccess());
      }
      
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleSignoutCancel = () => {
    setShowModal(false); // Hide the modal on cancel
  };
  

  
  return (
    <div>
    <Sidebar className="w-56 border-r-2">
      <Sidebar.Items className="mb-2">
        <Sidebar.ItemGroup className="">
          <div className="mb-2">
        <Link to="/admin?tab=admindash" >
          <Sidebar.Item href="" icon={HiUser} className={` rounded-full  hover:bg-[#cdf8da] ${dashboardClicked ? "bg-[#cdf8da] text-black" : ""}`} onClick={handleDashboardClick}>
          Admin Dashboard
          </Sidebar.Item>
          </Link>
          </div>
          
          <div className="mb-2">
          <Link to="/admin?tab=adminproduct">
          <Sidebar.Item icon={HiShoppingBag} className={` rounded-full hover:bg-[#cdf8da] ${productClicked ? "bg-[#cdf8da] text-black" : ""}`} onClick={handleProductClick}>
            Product
          </Sidebar.Item>
          </Link>
          </div>

         
          <div className="mb-2">
          <Link to="/admin?tab=adminmaterial">
          <Sidebar.Item icon={GoDatabase} className={` rounded-full hover:bg-[#cdf8da] ${materialClicked ? "bg-[#cdf8da] text-black" : ""}`} onClick={handleMaterialClick}>
            Row Material
          </Sidebar.Item>
          </Link>
          </div>
         
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={GoDatabase} className={` rounded-full  hover:bg-[#cdf8da] cursor-pointer ${logoutClicked ? "bg-[#cdf8da] text-black" : ""}`} onClick={handleSignoutClick}>Logout</Sidebar.Item>
        </Sidebar.ItemGroup>
        {/* <SignoutModal isOpen={showModal} onCancel={() => setShowModal(false)} onConfirm={confirmSignout} /> */}
      </Sidebar.Items>
    </Sidebar>
    {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="overflow-hidden bg-white rounded-lg shadow-lg w-96">
          <div className="p-4">
            <h2 className="mb-4 text-xl font-bold">Do you want to log out?</h2>
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 font-bold text-white bg-gray-500 rounded cursor-pointer" onClick={handleSignoutCancel}>
                No
              </button>
              <button className="px-4 py-2 font-bold text-white bg-red-500 rounded cursor-pointer" onClick={handleSignoutConfirm}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

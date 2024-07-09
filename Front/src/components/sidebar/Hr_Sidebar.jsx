import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GoDatabase } from "react-icons/go";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../../redux/user/userSlice";


export function Hr_Sidebar() {
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [productClicked, setProductClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [logoutClicked, setLogoutClicked] = useState(false);


  const handleDashboardClick = () => {
    setDashboardClicked(true);
    setProductClicked(false); // Ensure other button color is reset
  };

  const handleProductClick = () => {
    setProductClicked(true);
    setDashboardClicked(false); // Ensure other button color is reset
  };


  const handleSignoutClick = () => {
    setShowModal(true);
    
  };

  const handleSignoutConfirm = async () => {
    try {
      const res = await fetch("http://localhost:3000/users/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSignoutCancel = () => {
    setShowModal(false);
  };

  return (
    
<div>
    <Sidebar className="w-56 border-r-2">
      <Sidebar.Items className="bg-[#F5FFF5] ">
        <Sidebar.ItemGroup>
          <div className="mb-2">
            <Link to="/hr?tab=hrdash" >
              <Sidebar.Item href="" icon={HiUser} className={` rounded-full  hover:bg-[#cdf8da] ${dashboardClicked ? "bg-[#cdf8da] text-black" : ""}`} onClick={handleDashboardClick}>
                Admin Dashboard
              </Sidebar.Item>
            </Link>
          </div>
         
          <div className="mb-2">
            <Link to="/hr?tab=hrprofile" >
              <Sidebar.Item href="" icon={HiUser} className={` rounded-full  hover:bg-[#cdf8da] ${dashboardClicked ? "bg-[#cdf8da] text-black" : ""}`} onClick={handleDashboardClick}>
                Profiles
              </Sidebar.Item>
            </Link>
          </div>

          <div className="mb-2">
            <Link to="/hr?tab=hrattendance" >
              <Sidebar.Item href="" icon={HiUser} className={` rounded-full  hover:bg-[#cdf8da] ${dashboardClicked ? "bg-[#cdf8da] text-black" : ""}`} onClick={handleDashboardClick}>
                Attendance
              </Sidebar.Item>
            </Link>
          </div>


        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
        <Sidebar.Item
            icon={GoDatabase}
            className={`rounded-full hover:bg-[#cdf8da] cursor-pointer ${
              logoutClicked ? "bg-[#cdf8da] text-black" : ""
            }`}
            onClick={handleSignoutClick}
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pt-10 bg-gray-900 bg-opacity-50">
          <div className="overflow-hidden bg-white rounded-lg shadow-lg w-96">
            <div className="p-4">
              <h2 className="mb-4 text-xl font-bold">Do you want to log out?</h2>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 font-bold text-white bg-gray-500 rounded cursor-pointer"
                  onClick={handleSignoutCancel}
                >
                  No
                </button>
                <button
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded cursor-pointer"
                  onClick={handleSignoutConfirm}
                >
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

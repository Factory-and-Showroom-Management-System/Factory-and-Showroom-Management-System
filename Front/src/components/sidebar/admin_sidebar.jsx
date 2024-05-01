import { Sidebar } from "flowbite-react";
import {
  HiShoppingBag,
  HiUser,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useState } from "react";
import { GoDatabase } from "react-icons/go";

export function Admin_Sidebar() {

  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [productClicked, setProductClicked] = useState(false);
  const [materialClicked, setMaterialClicked] = useState(false);

  const handleDashboardClick = () => {
    setDashboardClicked(true);
    setProductClicked(false);
    setMaterialClicked;
     // Ensure other button color is reset
  };

  const handleProductClick = () => {
    setProductClicked(true);
    setDashboardClicked(false);
    setMaterialClicked(false);
  };

  const handleMaterialClick = () => {
    setProductClicked(false);
    setDashboardClicked(false);
    setMaterialClicked(true);
  };

  return (
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
          <Sidebar.Item icon={GoDatabase}>Logout</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

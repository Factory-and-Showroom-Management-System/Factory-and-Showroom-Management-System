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


export function Hr_Sidebar() {
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [productClicked, setProductClicked] = useState(false);

  const handleDashboardClick = () => {
    setDashboardClicked(true);
    setProductClicked(false); // Ensure other button color is reset
  };

  const handleProductClick = () => {
    setProductClicked(true);
    setDashboardClicked(false); // Ensure other button color is reset
  };

  return (
    

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
            <Link to="/hr?tab=" >
              <Sidebar.Item href="" icon={HiUser} className={` rounded-full  hover:bg-[#cdf8da] ${dashboardClicked ? "bg-[#cdf8da] text-black" : ""}`} onClick={handleDashboardClick}>
                Attendance
              </Sidebar.Item>
            </Link>
          </div>


        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiArrowSmRight}>Logout</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>

  );
}

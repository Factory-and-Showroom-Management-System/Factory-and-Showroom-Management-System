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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { LiaJediOrder } from "react-icons/lia";
import { GrOverview } from "react-icons/gr";
import { GiNuclearWaste } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useState, useEffect } from "react";
import { GoSignOut } from "react-icons/go";

export function Sales_Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(""); // Track the active tab
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route

  useEffect(() => {
    // Set the active tab based on the current route
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    setActiveTab(tab || "salesdash"); // Default to 'salesdash' if no tab is present
  }, [location]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Update active tab state
    navigate(`/sales?tab=${tabName}`);
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
            <Sidebar>
              <span className="font-bold text-center">SALES MANAGER</span>
            </Sidebar>

            <Sidebar.Item
              icon={LiaJediOrder}
              className={`rounded-full hover:bg-[#cdf8da] hover:text-black ${
                activeTab === "order" ? "bg-[#cdf8da] text-black" : ""
              }`}
              onClick={() => handleTabClick("order")}
            >
              Orders
            </Sidebar.Item>

            <Sidebar.Item
              icon={FaUsersBetweenLines}
              className={`rounded-full hover:bg-[#cdf8da] hover:text-black ${
                activeTab === "customer" ? "bg-[#cdf8da] text-black" : ""
              }`}
              onClick={() => handleTabClick("customer")}
            >
              Customers
            </Sidebar.Item>

            <Sidebar.Item
              icon={HiShoppingBag}
              className={`rounded-full hover:bg-[#cdf8da] hover:text-black ${
                activeTab === "product" ? "bg-[#cdf8da] text-black" : ""
              }`}
              onClick={() => handleTabClick("product")}
            >
              Products
            </Sidebar.Item>

            <Sidebar.Item
              icon={GiNuclearWaste}
              className={`rounded-full hover:bg-[#cdf8da] hover:text-black ${
                activeTab === "machine" ? "bg-[#cdf8da] text-black" : ""
              }`}
              onClick={() => handleTabClick("machine")}
            >
              Wastage
            </Sidebar.Item>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
            <Sidebar.Item
              icon={GoSignOut}
              className={`rounded-full hover:bg-[#cdf8da] cursor-pointer ${
                showModal ? "bg-[#cdf8da] text-black" : ""
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

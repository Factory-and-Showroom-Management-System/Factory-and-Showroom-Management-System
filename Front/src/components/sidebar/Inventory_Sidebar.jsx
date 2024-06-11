import { Sidebar } from "flowbite-react";
import { HiShoppingBag, HiUser } from "react-icons/hi";
import { GoDatabase } from "react-icons/go";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export function Inventory_Sidebar() {
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [productClicked, setProductClicked] = useState(false);
  const [materialClicked, setMaterialClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [inventoryClicked, setInventoryClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    setDashboardClicked(true);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    navigate("/inventory?tab=inventorydash");
  };

  const handleProductClick = () => {
    setProductClicked(true);
    setDashboardClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    navigate("/inventory?tab=inventoryproduct");
  };

  const handleMaterialClick = () => {
    setProductClicked(false);
    setDashboardClicked(false);
    setMaterialClicked(true);
    setLogoutClicked(false);
    setInventoryClicked(false);
    navigate("/inventory?tab=inventoryrow");
  };

  const handleSignoutClick = () => {
    setShowModal(true);
    setProductClicked(false);
    setDashboardClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(true);
    setInventoryClicked(false);
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
    <div className="flex flex-col h-screen">
      <Sidebar className="w-full border-r-2">
        <Sidebar.Items className="w-full">
          <Sidebar.ItemGroup className="w-full">
            <div className="w-full ml-2">
              <Sidebar.Item
                icon={HiUser}
                className={`rounded-full hover:bg-[#cdf8da] ${
                  dashboardClicked ? "bg-[#cdf8da] text-black" : ""
                }`}
                onClick={handleDashboardClick}
              >
                Inventory Dashboard
              </Sidebar.Item>
            </div>
            <div className="w-full">
              <Sidebar.Item
                icon={HiShoppingBag}
                className={`rounded-full hover:bg-[#cdf8da] ${
                  productClicked ? "bg-[#cdf8da] text-black" : ""
                }`}
                onClick={handleProductClick}
              >
                Product
              </Sidebar.Item>
            </div>
            <div className="w-full">
              <Sidebar.Item
                icon={GoDatabase}
                className={`rounded-full hover:bg-[#cdf8da] ${
                  materialClicked ? "bg-[#cdf8da] text-black" : ""
                }`}
                onClick={handleMaterialClick}
              >
                Raw Material
              </Sidebar.Item>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
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

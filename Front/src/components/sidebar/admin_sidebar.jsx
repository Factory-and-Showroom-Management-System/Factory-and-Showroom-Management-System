import { Sidebar } from "flowbite-react";
import { HiShoppingBag, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import { GoDatabase, GoBook, GoSignOut, GoPackage } from "react-icons/go";
import { useState } from "react";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export function Admin_Sidebar() {
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [productClicked, setProductClicked] = useState(false);
  const [earningClicked, setEarningClicked] = useState(false);
  const [additionClicked, setAdditionClicked] = useState(false);
  const [nettPayClicked, setNettPayClicked] = useState(false);
  const [deductionClicked, setDeductionClicked] = useState(false);
  const [ePFETFClicked, setEPFETFClicked] = useState(false);
  const [salaryDashboarlClicked, setSalaryDashboarClicked] = useState(false);
  const [materialClicked, setMaterialClicked] = useState(false);
  const [OrderClicked, setOrderClicked] = useState(false);
  const [CustomerClicked, setCustomerClicked] = useState(false);
  const [SalesClicked, setSalesClicked] = useState(false);
  const [WastageClicked, setWastageClicked] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [InventoryClicked, setInventoryClicked] = useState(false);
  const [financeClicked, setFinanceClicked] = useState(false);
  const [financeSalseClicked, setFinanceSalseClicked] = useState(false);
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem("token"));

 

  const handleWastageClicked = () => {
    setDashboardClicked(false);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(false);
    setAdditionClicked(false);
    setNettPayClicked(false);
    setDeductionClicked(false);
    setEPFETFClicked(false);
    setSalaryDashboarClicked(false);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(false);
    setWastageClicked(true);
    setOrderClicked(false);
    setSalesClicked(false);
  };

  const handleCustomerClicked = () => {
    setDashboardClicked(false);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(false);
    setAdditionClicked(false);
    setNettPayClicked(false);
    setDeductionClicked(false);
    setEPFETFClicked(false);
    setSalaryDashboarClicked(false);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(true);
    setWastageClicked(false);
    setOrderClicked(false);
    setSalesClicked(false);
  };

 

  const handleOrderClicked = () => {
    setDashboardClicked(false);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(false);
    setAdditionClicked(false);
    setNettPayClicked(false);
    setDeductionClicked(false);
    setEPFETFClicked(false);
    setSalaryDashboarClicked(false);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(false);
    setWastageClicked(false);
    setOrderClicked(true);
    setSalesClicked(false);
  };

  const handleDashboardClick = () => {
    setDashboardClicked(true);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(false);
    setAdditionClicked(false);
    setNettPayClicked(false);
    setDeductionClicked(false);
    setEPFETFClicked(false);
    setSalaryDashboarClicked(false);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(false);
    setWastageClicked(false);
    setOrderClicked(false);
    setSalesClicked(false);
  };

  const handleProductClick = () => {
    setDashboardClicked(false);
    setProductClicked(true);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(false);
    setAdditionClicked(false);
    setNettPayClicked(false);
    setDeductionClicked(false);
    setEPFETFClicked(false);
    setSalaryDashboarClicked(false);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(false);
    setWastageClicked(false);
    setOrderClicked(false);
    setSalesClicked(false);
  };

  const handleMaterialClick = () => {
    setDashboardClicked(false);
    setProductClicked(false);
    setMaterialClicked(true);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(false);
    setAdditionClicked(false);
    setNettPayClicked(false);
    setDeductionClicked(false);
    setEPFETFClicked(false);
    setSalaryDashboarClicked(false);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(false);
    setWastageClicked(false);
    setOrderClicked(false);
    setSalesClicked(false);
  };

  const handleSignoutClick = () => {
    setShowModal(true);
  };

  const handleNettPayClick = () => {
    setDashboardClicked(false);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(false);
    setAdditionClicked(false);
    setNettPayClicked(true);
    setDeductionClicked(false);
    setEPFETFClicked(false);
    setSalaryDashboarClicked(false);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(false);
    setWastageClicked(false);
    setOrderClicked(false);
    setSalesClicked(false);
  };

  const handleAdditionClick = () => {
    setDashboardClicked(false);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(false);
    setAdditionClicked(true);
    setNettPayClicked(false);
    setDeductionClicked(false);
    setEPFETFClicked(false);
    setSalaryDashboarClicked(false);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(false);
    setWastageClicked(false);
    setOrderClicked(false);
    setSalesClicked(false);
  };

  const handleEarningClick = () => {
    setDashboardClicked(false);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(true);
    setAdditionClicked(false);
    setNettPayClicked(false);
    setDeductionClicked(false);
    setEPFETFClicked(false);
    setSalaryDashboarClicked(false);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(false);
    setWastageClicked(false);
    setOrderClicked(false);
    setSalesClicked(false);
  };

  const handleDeductionClick = () => {
    setDashboardClicked(false);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(false);
    setAdditionClicked(false);
    setNettPayClicked(false);
    setDeductionClicked(true);
    setEPFETFClicked(false);
    setSalaryDashboarClicked(false);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(false);
    setWastageClicked(false);
    setOrderClicked(false);
    setSalesClicked(false);
  };

  const handleEPFETFClick = () => {
    setDashboardClicked(false);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(false);
    setAdditionClicked(false);
    setNettPayClicked(false);
    setDeductionClicked(false);
    setEPFETFClicked(true);
    setSalaryDashboarClicked(false);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(false);
    setWastageClicked(false);
    setOrderClicked(false);
    setSalesClicked(false);
  };

  const handleSalaryDashboardClick = () => {
    setDashboardClicked(false);
    setProductClicked(false);
    setMaterialClicked(false);
    setLogoutClicked(false);
    setInventoryClicked(false);
    setEarningClicked(false);
    setAdditionClicked(false);
    setNettPayClicked(false);
    setDeductionClicked(false);
    setEPFETFClicked(false);
    setSalaryDashboarClicked(true);
    setFinanceClicked(false);
    setFinanceSalseClicked(false);
    setCustomerClicked(false);
    setWastageClicked(false);
    setOrderClicked(false);
    setSalesClicked(false);
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
    setShowModal(false); // Hide the modal on cancel
  };

  return (
    <div className="flex flex-col h-screen">
      <Sidebar className="w-full border-r-2">
        <Sidebar.Items className="w-full">
          <Sidebar.ItemGroup className="w-full">
            <div className="w-full">
              <Link to="/admin?tab=admindash">
                <Sidebar.Item
                  href=""
                  icon={HiUser}
                  className={`rounded-full hover:bg-[#cdf8da] ${
                    dashboardClicked ? "bg-[#cdf8da] text-black" : ""
                  }`}
                  onClick={handleDashboardClick}
                >
                  Admin Dashboard
                </Sidebar.Item>
              </Link>
            </div>

            <Sidebar.Collapse
              icon={HiShoppingBag}
              className={`rounded-full hover:bg-[#cdf8da] ${
                InventoryClicked ? "bg-[#cdf8da] text-black" : ""
              }`}
              label="Inventory"
            >
              <div className="w-full">
                <Link to="/admin?tab=adminproduct">
                  <Sidebar.Item
                    icon={GoPackage}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      productClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={handleProductClick}
                  >
                    Product
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminmaterial">
                  <Sidebar.Item
                    icon={GoPackage}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      materialClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={handleMaterialClick}
                  >
                    Raw Material
                  </Sidebar.Item>
                </Link>
              </div>
            </Sidebar.Collapse>

            {/* finance */}

            <Sidebar.Collapse
              icon={HiShoppingBag}
              className={`rounded-full hover:bg-[#cdf8da] ${
                financeClicked ? "bg-[#cdf8da] text-black" : ""
              }`}
              label="Finance"
            >
              <Sidebar.Collapse
                icon={HiShoppingBag}
                className={`pl-5 rounded-full hover:bg-[#cdf8da] ${
                  financeSalseClicked ? "bg-[#cdf8da] text-black" : ""
                }`}
                label="Salary"
              ></Sidebar.Collapse>
              <div className="w-full">
                <Link to="/admin?tab=adminsalarydashboard">
                  <Sidebar.Item
                    icon={GoPackage}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      salaryDashboarlClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={handleSalaryDashboardClick}
                  >
                    Dashboard
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsalaryEarning">
                  <Sidebar.Item
                    icon={GoPackage}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      earningClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={handleEarningClick}
                  >
                    Earning
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsalaryDeduction">
                  <Sidebar.Item
                    icon={GoPackage}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      deductionClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={handleDeductionClick}
                  >
                    Deduction
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsalaryAddition">
                  <Sidebar.Item
                    icon={GoPackage}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      additionClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={handleAdditionClick}
                  >
                    Addition
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsalaryEPF">
                  <Sidebar.Item
                    icon={GoPackage}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      ePFETFClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={handleEPFETFClick}
                  >
                    EPF/ETF
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsalaryNettpay">
                  <Sidebar.Item
                    icon={GoPackage}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      nettPayClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={handleNettPayClick}
                  >
                    NettPay
                  </Sidebar.Item>
                </Link>
              </div>
            </Sidebar.Collapse>

            {/* sales */}

            <Sidebar.Collapse
              icon={HiShoppingBag}
              className={`rounded-full hover:bg-[#cdf8da] ${
                SalesClicked ? "bg-[#cdf8da] text-black" : ""
              }`}
              label="Sales"
              
            >
              <div className="w-full">
                <Link to="/admin?tab=adminsSalesorder">
                  <Sidebar.Item
                    icon={GoPackage}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      OrderClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={handleOrderClicked}
                  >
                    Order
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsSalescustomer">
                  <Sidebar.Item
                    icon={GoPackage}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      CustomerClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={handleCustomerClicked}
                  >
                   Customer
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsSaleswastage">
                  <Sidebar.Item
                    icon={GoPackage}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      WastageClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={handleWastageClicked}
                  >
                  Wastage
                  </Sidebar.Item>
                </Link>
              </div>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>

        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={GoSignOut}
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
              <h2 className="mb-4 text-xl font-bold">
                Do you want to log out?
              </h2>
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

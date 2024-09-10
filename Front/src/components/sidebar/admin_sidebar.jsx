import { Sidebar } from "flowbite-react";
import { HiShoppingBag, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { GoDatabase, GoPackage, GoSignOut } from "react-icons/go";
import { useState, useEffect } from "react";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { LiaJediOrder } from "react-icons/lia";
import { GiNuclearWaste } from "react-icons/gi";
import { BiSolidDashboard } from "react-icons/bi";
import { CgBox } from "react-icons/cg";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { TbMoneybag } from "react-icons/tb";
import { AiFillTags } from "react-icons/ai";

export function Admin_Sidebar() {
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const [ProfileClicked, setProfileClicked] = useState(false);
  const [AttendanceClicked, setAttendanceClicked] = useState(false);
  const [productClicked, setProductClicked] = useState(false);
  const [earningClicked, setEarningClicked] = useState(false);
  const [additionClicked, setAdditionClicked] = useState(false);
  const [nettPayClicked, setNettPayClicked] = useState(false);
  const [deductionClicked, setDeductionClicked] = useState(false);
  const [ePFETFClicked, setEPFETFClicked] = useState(false);
  const [salaryDashboardClicked, setSalaryDashboardClicked] = useState(false);
  const [materialClicked, setMaterialClicked] = useState(false);
  const [orderClicked, setOrderClicked] = useState(false);
  const [customerClicked, setCustomerClicked] = useState(false);
  const [salesClicked, setSalesClicked] = useState(false);
  const [wastageClicked, setWastageClicked] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [inventoryClicked, setInventoryClicked] = useState(false);
  const [financeClicked, setFinanceClicked] = useState(false);
  const [financeSalesClicked, setFinanceSalesClicked] = useState(false);
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");

    // Reset all states
    setDashboardClicked(false);
    setProductClicked(false);
    setMaterialClicked(false);
    setOrderClicked(false);
    setCustomerClicked(false);
    setSalesClicked(false);
    setWastageClicked(false);
    setInventoryClicked(false);
    setFinanceClicked(false);
    setFinanceSalesClicked(false);
    setEarningClicked(false);
    setAdditionClicked(false);
    setNettPayClicked(false);
    setDeductionClicked(false);
    setEPFETFClicked(false);
    setSalaryDashboardClicked(false);
    setLogoutClicked(false);
    setAttendanceClicked(false);
    setProfileClicked(false);

    // Set the relevant state based on the 'tab' query parameter
    switch (tab) {
      case "adminprofile":
        setProfileClicked(true);
        break;
        case "adminattendance":
        setAttendanceClicked(true);
        break;
      case "admindash":
        setDashboardClicked(true);
        break;
      case "adminproduct":
        setProductClicked(true);
        break;
      case "adminmaterial":
        setMaterialClicked(true);
        break;
      case "adminsalarydashboard":
        setSalaryDashboardClicked(true);
        break;
      case "adminsAllMonthSalarySheet":
        setSalaryDashboardClicked(true);
        break;

      case "adminsalaryEarning":
        setEarningClicked(true);
        break;
      case "adminsBasicSalary":
        setEarningClicked(true);
        break;
      case "adminsRoleIncome":
        setEarningClicked(true);
        break;
      case "adminsBudgetedAllowance":
        setEarningClicked(true);
        break;
      case "adminsEarning":
        setEarningClicked(true);
        break;
      case "adminsalaryDeduction":
        setDeductionClicked(true);
        break;
      case "adminsUserMonrhLoan":
        setDeductionClicked(true);
        break;
      case "adminsUserMonrhLoan":
        setDeductionClicked(true);
        break;
      case "adminsDeduction":
        setDeductionClicked(true);
        break;
      case "adminsUserTotalLoane":
        setDeductionClicked(true);
        break;

      case "adminsalaryAddition":
        setAdditionClicked(true);
        break;
      case "adminsFoodAllowance":
        setAdditionClicked(true);
        break;
      case "adminsMonthOT":
        setAdditionClicked(true);
        break;
      case "adminsAddition":
        setAdditionClicked(true);
        break;
      case "adminsRoleOTIncome":
        setAdditionClicked(true);
        break;

      case "adminsalaryEPF":
        setEPFETFClicked(true);
        break;
      case "adminsalaryNettpay":
        setNettPayClicked(true);
        break;
      case "adminsSalesorder":
        setOrderClicked(true);
        break;
      case "adminsSalescustomer":
        setCustomerClicked(true);
        break;
      case "adminsSaleswastage":
        setWastageClicked(true);
        break;

      default:
        break;
    }
  }, [location.search]);

  const handleSignoutClick = () => {
    setShowModal(true); // Show the modal
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
                  onClick={() => setDashboardClicked(true)}
                >
                  Admin Dashboard
                </Sidebar.Item>
              </Link>
            </div>

            <Sidebar.Collapse
              icon={AiFillTags}
              className={`rounded-full hover:bg-[#cdf8da] ${
                inventoryClicked ? "bg-[#cdf8da] text-black" : ""
              }`}
              label="Inventory"
            >
              <div className="w-full">
                <Link to="/admin?tab=adminproduct">
                  <Sidebar.Item
                    icon={HiShoppingBag}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      productClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setProductClicked(true)}
                  >
                    Product
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminmaterial">
                  <Sidebar.Item
                    icon={GoDatabase}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      materialClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setMaterialClicked(true)}
                  >
                    Raw Material
                  </Sidebar.Item>
                </Link>
              </div>
            </Sidebar.Collapse>

            {/* Finance */}
            <Sidebar.Collapse
              icon={RiMoneyDollarCircleFill}
              className={`rounded-full hover:bg-[#cdf8da] ${
                financeClicked ? "bg-[#cdf8da] text-black" : ""
              }`}
              label="Finance"
            >
              <Sidebar.Collapse
                icon={FaMoneyCheckAlt}
                className={`pl-5 rounded-full hover:bg-[#cdf8da] ${
                  financeSalesClicked ? "bg-[#cdf8da] text-black" : ""
                }`}
                label="Salary"
              />
              <div className="w-full">
                <Link to="/admin?tab=adminsalarydashboard">
                  <Sidebar.Item
                    icon={FaMoneyBillTrendUp}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      salaryDashboardClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setSalaryDashboardClicked(true)}
                  >
                    Dashboard
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsalaryEarning">
                  <Sidebar.Item
                    icon={GiPayMoney}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      earningClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setEarningClicked(true)}
                  >
                    Earning
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsalaryDeduction">
                  <Sidebar.Item
                    icon={GiMoneyStack}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      deductionClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setDeductionClicked(true)}
                  >
                    Deduction
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsalaryAddition">
                  <Sidebar.Item
                    icon={GiTakeMyMoney}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      additionClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setAdditionClicked(true)}
                  >
                    Addition
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsalaryEPF">
                  <Sidebar.Item
                    icon={CgBox}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      ePFETFClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setEPFETFClicked(true)}
                  >
                    EPF/ETF
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsalaryNettpay">
                  <Sidebar.Item
                    icon={GiReceiveMoney}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      nettPayClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setNettPayClicked(true)}
                  >
                    Nett Pay
                  </Sidebar.Item>
                </Link>
              </div>
            </Sidebar.Collapse>

            {/* Sales */}
            <Sidebar.Collapse
              icon={TbMoneybag}
              className={`rounded-full hover:bg-[#cdf8da] ${
                salesClicked ? "bg-[#cdf8da] text-black" : ""
              }`}
              label="Sales"
            >
              <div className="w-full">
                <Link to="/admin?tab=adminsSalesorder">
                  <Sidebar.Item
                    icon={LiaJediOrder}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      orderClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setOrderClicked(true)}
                  >
                    Order
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsSalescustomer">
                  <Sidebar.Item
                    icon={FaUsersBetweenLines}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      customerClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setCustomerClicked(true)}
                  >
                    Customer
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminsSaleswastage">
                  <Sidebar.Item
                    icon={GiNuclearWaste}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      wastageClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setWastageClicked(true)}
                  >
                    Wastage
                  </Sidebar.Item>
                </Link>
              </div>
            </Sidebar.Collapse>

            {/* hr */}
            <Sidebar.Collapse
              icon={TbMoneybag}
              className={`rounded-full hover:bg-[#cdf8da] ${
                salesClicked ? "bg-[#cdf8da] text-black" : ""
              }`}
              label="HR"
            >
              <div className="w-full">
                <Link to="/admin?tab=adminprofile">
                  <Sidebar.Item
                    icon={LiaJediOrder}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      ProfileClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setProfileClicked(true)}
                  >
                    Profile
                  </Sidebar.Item>
                </Link>
              </div>

              <div className="w-full">
                <Link to="/admin?tab=adminattendance">
                  <Sidebar.Item
                    icon={FaUsersBetweenLines}
                    className={`rounded-full hover:bg-[#cdf8da] ${
                      AttendanceClicked ? "bg-[#cdf8da] text-black" : ""
                    }`}
                    onClick={() => setAttendanceClicked(true)}
                  >
                    Attendance
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
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

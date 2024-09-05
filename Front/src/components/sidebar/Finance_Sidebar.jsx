import { Sidebar } from "flowbite-react";
import { GoDatabase } from "react-icons/go";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../../redux/user/userSlice";

import { BiBuoy } from "react-icons/bi";
import { CgAdidas } from "react-icons/cg";
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
import { BiSolidDashboard } from "react-icons/bi";
import {  GoSignOut } from "react-icons/go";


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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function Finance_Sidebar() {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [logoutClicked, setLogoutClicked] = useState(false);

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
    setShowModal(false); // Hide the modal on cancel
  };
  


  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);



  
  return (
<div>
    <Sidebar className="w-56 border-r-2">
      <Sidebar.Items className="bg-[#F5FFF5] ">

        <Sidebar.ItemGroup>
          <Link to="/finance?tab=financedash">
            <Sidebar.Item icon={BiSolidDashboard} active={tab == 'financedash'}>
              Finance Dashboard
            </Sidebar.Item>
          </Link>


          <Sidebar.Collapse label="Salary" icon={RiMoneyDollarCircleFill}>
            <Link to="/finance?tab=salarydash">
              <Sidebar.Item icon={HiChartPie} active={tab == 'salarydash'}>
                Dashboard
              </Sidebar.Item>
            </Link>

            <Link to="/finance?tab=erningdash">
              <Sidebar.Item icon={GiReceiveMoney} active={tab == 'erningdash'}>
                Earning
              </Sidebar.Item>
            </Link>

            <Link to="/finance?tab=deductiondash">
              <Sidebar.Item icon={GiPayMoney} active={tab == 'deductiondash'}>
                Deduction
              </Sidebar.Item>
            </Link>

            <Link to="/finance?tab=additiondash">
              <Sidebar.Item icon={GiMoneyStack} active={tab == 'additiondash'}>
                Addition
              </Sidebar.Item>
            </Link>

            <Link to="/finance?tab=epfetfdash">
              <Sidebar.Item icon={GiTakeMyMoney} active={tab == 'epfetfdash'}>
                EPF/ETF
              </Sidebar.Item>
            </Link>

            <Link to="/finance?tab=nettpaydash">
            <Sidebar.Item icon={FaMoneyCheckAlt} active={tab == 'nettpaydash'}>
              NettPay

            </Sidebar.Item>
            </Link>
          </Sidebar.Collapse>















          <Sidebar.Collapse label="Revenue" icon={TbMoneybag}>

            <Sidebar.Item icon={GiReceiveMoney}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={GiPayMoney}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={GiMoneyStack}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={GiTakeMyMoney}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={FaMoneyCheckAlt}>
              <Link to=""></Link>
            </Sidebar.Item>

          </Sidebar.Collapse>


        
          <Sidebar.Collapse label="Expence" icon={FaMoneyBillTrendUp}>

            <Sidebar.Item icon={GiReceiveMoney}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={GiPayMoney}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={GiMoneyStack}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={GiTakeMyMoney}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={FaMoneyCheckAlt}>
              <Link to=""></Link>
            </Sidebar.Item>

          </Sidebar.Collapse>





          {/* 
          <Sidebar.Item icon={HiShoppingBag}>
            <Link to=""></Link>
          </Sidebar.Item> */}
          <Sidebar.Collapse label="Liability" icon={AiFillTags}>

            <Sidebar.Item icon={GiReceiveMoney}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={GiPayMoney}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={GiMoneyStack}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={GiTakeMyMoney}>
              <Link to=""></Link>
            </Sidebar.Item>

            <Sidebar.Item icon={FaMoneyCheckAlt}>
              <Link to=""></Link>
            </Sidebar.Item>

          </Sidebar.Collapse>

        </Sidebar.ItemGroup>
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

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Admin_Sidebar } from "../../components/sidebar/admin_sidebar";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminProduct from "../Admin/AdminProduct/AdminProduct";
import AdminRowMaterial from "../Admin/RowMaterial/AdminRowMaterial";
import SalaryDashboard from "../Admin/FinanceSalary/SalaryDashboard/SalaryDashboard"
import Earning from "../Admin/FinanceSalary/Earning/EaringDash"
import Deduction from "../Admin/FinanceSalary/Deduction/DeductionDash"
import Addition from "../Admin/FinanceSalary/Addition/AdditionDash";
import EpfEtfDash from "../Admin/FinanceSalary/EpfEtf/EpfEtfDash"
import NettPayDash from "../Admin/FinanceSalary/NetPay/NettPayDash"
import Order from "../Admin/AdminSales/Order";
import Wastage from "../Admin/AdminSales/Wastage"
import Customer from "../Admin/AdminSales/Customer";
import AllMonthSalarySheet from "../Admin/FinanceSalary/SalaryDashboard/AllMonthSalarySheet ";
import BasicSalaries from "../Admin/FinanceSalary/Earning/BasicSalaries";

import RoleIncome from "../Admin/FinanceSalary/Earning/RoleIncome";
import BudgetedAllowance from "../Admin/FinanceSalary/Earning/BudgetedAllowance";
import Deductions from "../Admin/FinanceSalary/Deduction/Deduction";
import UserMonthLoan from "../Admin/FinanceSalary/Deduction/UserMonrhLoan";
import UserTotalLoans from "../Admin/FinanceSalary/Deduction/UserTotalLoane";

import FoodAllowance from "../Admin/FinanceSalary/Addition/FoodAllowance";
import MonthFoodAllowance from "../Admin/FinanceSalary/Addition/MonthFoodAllowance";
import MonthOT from "../Admin/FinanceSalary/Addition/MonthOT";
import RoleOTIncome from "../Admin/FinanceSalary/Addition/RoleOTIncome";
import MonthEpfEtfs from "../Admin/FinanceSalary/EpfEtf/MonthEpfEtfs";
import EaringDash from "../Admin/FinanceSalary/Earning/EaringDash";
import DeductionDash from "../Admin/FinanceSalary/Deduction/DeductionDash";

import Attendance from "../Admin/AdminHr/ManageAttendance/Attendance"
import AdminProfile from "../Admin/AdminHr/ManageProfile/Profiles"


export function Admin() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
        <div className=" md:w-56">
          <Admin_Sidebar />
        </div >
        <div className="w-full">
          {/* {tab === 'User' && <<BasicSalaries />/>}  */}
          {tab === "admindash" && <AdminDashboard/>}
          {tab === "adminproduct" && <AdminProduct/>}
          {tab === "adminmaterial" && <AdminRowMaterial/>}
          {tab === "adminattendance" && <Attendance/>}
         {tab === "adminprofile" && <AdminProfile/>} 
        
          
          
          {tab === "adminsalaryEarning" && <Earning/>}
          {tab === "adminsalaryDeduction" && <Deduction/>}
          {tab === "adminsalaryAddition" && <Addition/>}
          {tab === "adminsalaryEPF" && <EpfEtfDash/>}
          {tab === "adminsalaryNettpay" && <NettPayDash/>}
          {tab === "adminsSalesorder" && <Order/>}
          {tab === "adminsSaleswastage" && <Wastage/>}
          {tab === "adminsSalescustomer" && <Customer/>}

          {tab === "adminsalarydashboard" && <SalaryDashboard/>}
          {tab === "adminsAllMonthSalarySheet" && <AllMonthSalarySheet/>}
          {tab === "adminsBasicSalary" && <BasicSalaries/>}
          {tab === "adminsEarning" && <EaringDash/>}
          {tab === "adminsRoleIncome" && <RoleIncome/>}
          {tab === "adminsBudgetedAllowance" && <BudgetedAllowance/>}
          {tab === "adminsDeduction" && <DeductionDash/>}
          {tab === "adminsUserMonrhLoan" && <UserMonthLoan/>}
          {tab === "adminsUserTotalLoane" && <UserTotalLoans/>}
          {tab === "adminsAddition" && <Addition/>}
          {tab === "adminsFoodAllowance" && <FoodAllowance/>}
          {tab === "adminsMonthFoodAllowance" && <MonthFoodAllowance/>}
          {tab === "adminsMonthOT" && <MonthOT/>}
          {tab === "adminsRoleOTIncome" && <RoleOTIncome/>}
          {tab === "adminsMonthEpfEtfs" && <MonthEpfEtfs/>}


         

          </div>
          </div>
      
  );
}

export default Admin;

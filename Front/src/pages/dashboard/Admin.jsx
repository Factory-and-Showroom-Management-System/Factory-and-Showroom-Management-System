import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Admin_Sidebar } from "../../components/sidebar/admin_sidebar";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminProduct from "../Admin/AdminProduct/AdminProduct";
import AdminRowMaterial from "../Admin/RowMaterial/AdminRowMaterial";
import SalaryDashboard from "../Admin/FinanceSalary/SalaryDashboard/SalaryDashboard"
import Earning from "../Admin/FinanceSalary/Earning/Earning"
import Deduction from "../Admin/FinanceSalary/Deduction/Deduction"
import Addition from "../Admin/FinanceSalary/Addition/Addition";
import EpfEtfDash from "../Admin/FinanceSalary/EpfEtf/EpfEtfDash"
import NettPayDash from "../Admin/FinanceSalary/NetPay/NettPayDash"
import Order from "../Admin/AdminSales/Order";
import Wastage from "../Admin/AdminSales/Wastage"
import Customer from "../Admin/AdminSales/Customer";



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
        
          
          {tab === "adminsalarydashboard" && <SalaryDashboard/>}
          {tab === "adminsalaryEarning" && <Earning/>}
          {tab === "adminsalaryDeduction" && <Deduction/>}
          {tab === "adminsalaryAddition" && <Addition/>}
          {tab === "adminsalaryEPF" && <EpfEtfDash/>}
          {tab === "adminsalaryNettpay" && <NettPayDash/>}
          {tab === "adminsSalesorder" && <Order/>}
          {tab === "adminsSaleswastage" && <Wastage/>}
          {tab === "adminsSalescustomer" && <Customer/>}
          
          
          </div>
          </div>
      
  );
}

export default Admin;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Finance_Sidebar } from "../..//components/sidebar/Finance_Sidebar";
import FinanceDashboard from "../Finance/FinanceDashboard/FinanceDashboard";
import SalaryDashboard from "../Finance/Salary/SalaryDashboard/SalaryDashboard";
import EaringDash from "../Finance/Salary/Earning/EaringDash";
import DeductionDash from "../Finance/Salary/Deduction/DeductionDash";
import AdditionDash from "../Finance/Salary/Addition/AdditionDash";
import EpfEtfDash from "../Finance/Salary/EpfEtf/EpfEtfDash";
import NettPayDash from "../Finance/Salary/NetPay/NettPayDash";
import BasicSalaries from "../Finance/Salary/Earning/BasicSalaries";
import RoleIncome from "../Finance/Salary/Earning/RoleIncome";
import BudgetedAllowance from "../Finance/Salary/Earning/BudgetedAllowance";
import UserMonrthLoan from "../Finance/Salary/Deduction/UserMonrhLoan";
import UserTotalLoane from "../Finance/Salary/Deduction/UserTotalLoane";
import MonthFoodAllwance from "../Finance/Salary/Addition/MonthFoodAllowance";
import MonthOT from "../Finance/Salary/Addition/MonthOT";
import FoodAllowance from "../Finance/Salary/Addition/FoodAllowance";
import RoleOTIncome from "../Finance/Salary/Addition/RoleOTIncome";
import MonthSalarySheets from "../Finance/Salary/SalaryDashboard/MonthSalarySheet";
import AllMonthSalarySheet from "../Finance/Salary/SalaryDashboard/AllMonthSalarySheet ";






export function FinanceManager() {
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
          <Finance_Sidebar />
        </div >
        <div className="w-full">
          {tab === "financedash" && <FinanceDashboard/>}
          {tab === 'salarydash' && <SalaryDashboard />}
          {tab === 'erningdash' && <EaringDash/>}
          {tab === 'deductiondash' && <DeductionDash/>}
          {tab === 'additiondash' && <AdditionDash/>}
          {tab === 'epfetfdash' && <EpfEtfDash/>}
          {tab === 'nettpaydash' && <NettPayDash/>}
          {tab === "basicsalarytb" && <BasicSalaries/>}
          {tab === "handleRoleIncome" && <RoleIncome/>}
          {tab === "hadelBugetAllowance" && <BudgetedAllowance/>}
          {tab === "usermonthloan" && <UserMonrthLoan/>}
          {tab === "usertotalloane" && <UserTotalLoane/>}
          {tab === "monthfoodAllwance" && <MonthFoodAllwance/>}
          {tab === "monthot" && <MonthOT/>}
          {tab === "foodallowance" && <FoodAllowance/>}
          {tab === "roleotincome" && <RoleOTIncome/>}
          {tab === "monthsalarysheets" && <MonthSalarySheets/>}
          {tab === "allmonthsalrysheet" && <AllMonthSalarySheet/>}
          

          </div>
      </div>
    
  );
}

export default FinanceManager;

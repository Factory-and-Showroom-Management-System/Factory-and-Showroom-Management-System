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

          
          </div>
      </div>
    
  );a
}

export default FinanceManager;

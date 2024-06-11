import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Finance_Sidebar } from "../..//components/sidebar/Finance_Sidebar";
import FinanceDashboard from "../Finance/FinanceDashboard/FinanceDashboard";

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
          {/* {tab === 'User' && <<BasicSalaries />/>}  */}
          {tab === "financedash" && <FinanceDashboard/>}
          </div>
      </div>
    
  );
}

export default FinanceManager;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Admin_Sidebar } from "../../components/sidebar/admin_sidebar";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminProduct from "../Admin/AdminProduct/AdminProduct";



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
          </div>
      </div>
  );
}

export default Admin;

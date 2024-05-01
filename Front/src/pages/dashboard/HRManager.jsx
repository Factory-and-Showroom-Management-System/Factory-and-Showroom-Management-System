import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Hr_Sidebar } from '../../components/sidebar/Hr_Sidebar';
import HRDashboard from '../HR/HRDashboard/HRDashboard';
import Profiles from '../HR/ManageProfile/Profiles';

export function HRManager() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
    <div className=" md:w-56">
      <Hr_Sidebar />
    </div >
    <div className="w-full">
      {/* {tab === 'User' && <<BasicSalaries />/>}  */}
      {tab === "hrdash" && <HRDashboard/>}
      {tab === "hrprofile" && <Profiles/>}
      </div>
  </div>
  );
}

export default HRManager;

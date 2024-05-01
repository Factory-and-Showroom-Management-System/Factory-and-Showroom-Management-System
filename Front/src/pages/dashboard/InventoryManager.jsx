import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Inventory_Sidebar} from '../../components/sidebar/Inventory_Sidebar';


import InventoryDashboard from '../Inventory/InventoryDashboard/InventoryDashboard';

export function InventoryManager() {
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
   <Inventory_Sidebar />
    </div >
    <div className="w-full">
      {/* {tab === 'User' && <<BasicSalaries />/>}  */}
      {tab === "inventorydash" && <InventoryDashboard />}
      </div>
  </div>
  );
}

export default InventoryManager;

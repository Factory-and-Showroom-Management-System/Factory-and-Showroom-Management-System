import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";

import { Inventory_Sidebar } from '../../components/sidebar/Inventory_Sidebar';


export function InventoryManagerDashboard() {
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
 <div>
  <Navbar/>
    <div className='flex flex-col min-h-screen md:flex-row'>
      
      <div className='md:w-56 '>
      
  <Inventory_Sidebar/>
      </div>
      


{/* {tab === 'User' && <CreateUser />} */}
   </div>
   </div>
  );
}

export default InventoryManagerDashboard;
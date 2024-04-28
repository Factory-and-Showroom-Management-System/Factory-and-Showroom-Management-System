import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import { Admin_Sidebar } from '../../components/sidebar/Admin_Sidebar';


export function AdminDashboard() {
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
      
    <Admin_Sidebar/>
      </div>
      




   </div>
   </div>
  );
}

export default AdminDashboard;

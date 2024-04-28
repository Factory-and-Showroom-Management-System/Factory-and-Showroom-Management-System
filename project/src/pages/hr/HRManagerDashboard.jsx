import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import { Hr_Sidebar } from '../../components/sidebar/Hr_Sidebar';
import Attendance from './Attendance/Attendance';


export function HRManagerDashboard() {
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
      
 <Hr_Sidebar/>
      </div>
      


{tab === 'attendance' && <Attendance/>} 

   </div>
   </div>
  );
}

export default HRManagerDashboard;

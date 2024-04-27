
import Table from "./Table";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Table2 from "./Table2";
import {Dash_Sidebar} from "../../components/sidebar/Admin_Sidebar";
import Navbar from "../../components/Navbar/Navbar";


export function Dashboard() {
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
      
     <Dash_Sidebar/>
      </div>
      

{tab === 'table' && <Table />}
{tab === 'table2' && <Table2 />}


   </div>
   </div>
  );
}



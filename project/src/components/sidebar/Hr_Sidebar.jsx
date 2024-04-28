
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link } from "react-router-dom";




export function Hr_Sidebar() {
  
  return (
    
    <div className='w-full max-w-lg p-3 mx-auto'>
      
     
       <div >
    <Sidebar  >
      <Sidebar.Items >
        <Sidebar.ItemGroup >
          <Sidebar.Item icon={HiChartPie} >
            <Link to="/dashboard?tab=">HR Dashboard</Link>
          
          </Sidebar.Item>
          <Sidebar.Item icon={HiViewBoards}>
          <Link to="/dashboard?tab=">Dashboard 2 </Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          
          <Sidebar.Item icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
        <Sidebar.Item icon={HiArrowSmRight}>
            Logout
          </Sidebar.Item>
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>


     </div>

 
    
    
  
  );
}



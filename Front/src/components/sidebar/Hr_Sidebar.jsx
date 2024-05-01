import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export function Hr_Sidebar() {
  return (
    
        <Sidebar className="w-56 border-r-2">
          <Sidebar.Items className="bg-[#F5FFF5] ">
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiChartPie}>
                <Link to="/hr?tab=hrdash">HR Dashboard</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiViewBoards}>
                <Link to=""></Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiInbox}>
                <Link to=""></Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiUser}>
                <Link to=""></Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiShoppingBag}>
                <Link to=""></Link>
              </Sidebar.Item>

              <Sidebar.Item icon={HiTable}>
                <Link to=""></Link>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiArrowSmRight}>Logout</Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
    
  );
}

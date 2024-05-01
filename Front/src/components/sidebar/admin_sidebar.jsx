import { Sidebar } from "flowbite-react";
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

export function Admin_Sidebar() {
  return (
    <Sidebar className="w-56 border-r-2">
      <Sidebar.Items className="bg-[#F5FFF5] ">
        <Sidebar.ItemGroup className="">
          <Sidebar.Item href="" icon={HiChartPie}>
            <Link to="/finance?tab=admin">Admin Dashboard</Link>
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

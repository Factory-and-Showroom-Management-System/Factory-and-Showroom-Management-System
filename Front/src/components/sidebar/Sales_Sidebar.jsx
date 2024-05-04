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
import { FaUsersBetweenLines } from "react-icons/fa6";
import { LiaJediOrder } from "react-icons/lia";
import { GrOverview } from "react-icons/gr";
import { GiNuclearWaste } from "react-icons/gi";

export function Sales_Sidebar() {
  return (

        <Sidebar className="w-56 border-r-2">
          <Sidebar.Items className="bg-[#F5FFF5] ">
            <Sidebar.ItemGroup>
              <Sidebar>
              <Link to="/sales?tab=salesdash" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                 Sales_Product Dashboard
              </Link>
              </Sidebar>

              <Sidebar.Item icon={LiaJediOrder}>
              <Link to="/sales?tab=order">Orders</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={FaUsersBetweenLines}>
              <Link to="/sales?tab=customer">Customers</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={HiShoppingBag}>
              <Link to="/sales?tab=product">Products</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={GrOverview}>
              <Link to="">Overview</Link>
              </Sidebar.Item>

              <Sidebar.Item icon={GiNuclearWaste}>
              <Link to="/sales?tab=machine">Wastage</Link>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiArrowSmRight}>Logout</Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
  
  );
}

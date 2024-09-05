import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sales_Sidebar } from '../../components/sidebar/Sales_Sidebar';
import SalesDashboard from '../Sales/Order';
import Order from '../Sales/Order';
import Customer from '../Sales/Customer';
import Product from '../Sales/Product';
import Wastage from '../Sales/Wastage';


export function SalesManager() {
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
          <Sales_Sidebar />
        </div >
        <div className="w-full">
          {/* {tab === 'User' && <<BasicSalaries />/>}  */}
          {tab === "salesdash" && <SalesDashboard/>}

          {tab === "order" && <Order />}
          {tab === "customer" && <Customer />}
          {tab === "product" && <Product />}
          {tab === "machine" && <Wastage />}

      </div>
    </div>
  );
}


export default SalesManager;

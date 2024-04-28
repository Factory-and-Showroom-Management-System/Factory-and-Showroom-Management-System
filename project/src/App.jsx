import UserLogin from './components/login/UserLogin'
import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'


// import Users from './pages/Users'
// import Product from './pages/Product'
// import AddUser from './pages/AddUser'
// import EditUser from './pages/EditUser'
import './index.css'

import AdminDashboard from './pages/admin/AdminDashboard';
import SalesManagerDashboard from './pages/sales/SalesManagerDashboard';
import InventoryManagerDashboard from './pages/inventory/InventoryManagerDashboard';
import FinanceManagerDashboard from './pages/financial/FinanceManagerDashboard';
import HRManagerDashboard from './pages/hr/HRManagerDashboard';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<UserLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/sales/dashboard" element={<SalesManagerDashboard/>} />
          <Route path="/inventory/dashboard" element={<InventoryManagerDashboard/>} />
       
          <Route path="/finance/dashboard" element={<FinanceManagerDashboard/>} />
          <Route path="/hr/dashboard" element={<HRManagerDashboard/>} />
    

        


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
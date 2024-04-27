import UserLogin from './components/login/UserLogin'
import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'


// import Users from './pages/Users'
// import Product from './pages/Product'
// import AddUser from './pages/AddUser'
// import EditUser from './pages/EditUser'
import './index.css'
import { Dashboard } from './pages/dashboard/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
// import CreateUser from './components/createUser/CreateUser'

// import SalesManagerDashboard from './pages/sales/SalesManagerDashboard';
// import FinanceManagerDashboard from './pages/financial/FinanceManagerDashboard';
// import InventoryManagerDashboard from './pages/inventory/InventoryManagerDashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="" element={<CreateUser />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<UserLogin />} />
          {/* <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Product />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} /> */}
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        {/* <Route path="/sales-manager/dashboard" component={SalesManagerDashboard} />
        <Route path="/finance-manager/dashboard" component={FinanceManagerDashboard} />
        <Route path="/inventory-manager/dashboard" component={InventoryManagerDashboard} /> */}
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
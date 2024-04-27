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
import SalesManagerDashboard from './pages/sales/SalesManagerDashboard';
import InventoryManagerDashboard from './pages/inventory/InventoryManagerDashboard';
import Table from './pages/dashboard/Table';
import Table2 from './pages/dashboard/Table2';



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
          <Route path="/sales/dashboard" element={<SalesManagerDashboard/>} />
          <Route path="/inventory/dashboard" element={<InventoryManagerDashboard/>} />
          <Route path="/table" element={<Table />} />
          <Route path="/table2" element={<Table2/>}/>
        

         
       
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
import UserLogin from './components/login/UserLogin'
import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard' 
import Users from './pages/Users'
import Product from './pages/Product'
import AddUser from './pages/AddUser'
import EditUser from './pages/EditUser'
import './index.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Product />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
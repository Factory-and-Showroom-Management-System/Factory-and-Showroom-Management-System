import React from "react";
import "./index.css";
import UserLogin from "./components/login/UserLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FinanceManagerDashboard, {
  FinanceManager,
} from "./pages/dashboard/FinanceManager";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./pages/dashboard/Admin";
import SalesManager from "./pages/dashboard/SalesManager";
import InventoryManager from "./pages/dashboard/InventoryManager";
import HRManager from "./pages/dashboard/HRManager";
import HomePage from "./components/HomePage/HomePage";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLogin />} />

          <Route element={<PrivateRoute />}>
          
           
            <Route path="/admin" element={<Admin />} />
            <Route path="/sales" element={<SalesManager />} />
            <Route path="/inventory" element={<InventoryManager />} />
            <Route path="/finance" element={<FinanceManager />} />
            <Route path="/hr" element={<HRManager />} />
          
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

import React from "react";
import "./index.css";
// // import Addition from './pages/Finance/Salary/Addition/Addition';
// import RoleIncome from './pages/Finance/Salary/Earning/RoleIncome';
// import BasicSalaries from './pages/Finance/Salary/Earning/BasicSalaries';
// import Earning from './pages/Finance/Salary/Earning/Earning';
// import BudgetedAllowance from './pages/Finance/Salary/Earning/BudgetedAllowance';

// import UserTotalLoane from './pages/Finance/Salary/Deduction/UserTotalLoane';
// import UserMonrhLoan from './pages/Finance/Salary/Deduction/UserMonrhLoan';
// import MonthEpfEtfs from './pages/Finance/Salary/EpfEtf/MonthEpfEtfs';
// import Deduction from './pages/Finance/Salary/Deduction/Deduction';

// import Addition from './pages/Finance/Salary/Addition/Addition';
// import FoodAllowance from './pages/Finance/Salary/Addition/FoodAllowance';
// import MonthFoodAllowance from './pages/Finance/Salary/Addition/MonthFoodAllowance';

// import RoleOTIncome from './pages/Finance/Salary/NetPay/RoleOTIncome';
// import MonthOT from './pages/Finance/Salary/NetPay/MonthOT';
// import UserNetPay from './pages/Finance/Salary/NetPay/UserNetPay';

// import MonthSalarySheet from './pages/Finance/Salary/MonthSalarySheet';
// import SubTotalMonthSalarySheet from './pages/Finance/Salary/SubTotalMonthSalarySheet';
// import AllMonthSalarySheet from './pages/Finance/Salary/AllMonthSalarySheet ';

// import DashBaord from './pages/Finance/Salary/DashBaord';

// import AreaChart01 from './pages/Finance/Salary/Charts/AreaChart01';
// import AreaChart02 from './pages/Finance/Salary/Charts/AreaChart02';
// import AreaChart03 from './pages/Finance/Salary/Charts/AreaChart03';
// import AreaChart04 from './pages/Finance/Salary/Charts/AreaChart04';
// import AreaChart05 from './pages/Finance/Salary/Charts/AreaChart05';
// import AreaChart06 from './pages/Finance/Salary/Charts/AreaChart06';
// import AreaChart07 from './pages/Finance/Salary/Charts/AreaChart07';
import UserLogin from "./components/login/UserLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./components/login/Test";
import FinanceManagerDashboard, {
  FinanceManager,
} from "./pages/dashboard/FinanceManager";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./pages/dashboard/Admin";
import SalesManager from "./pages/dashboard/SalesManager";
import InventoryManager from "./pages/dashboard/InventoryManager";
import HRManager from "./pages/dashboard/HRManager";
import HomePage from "./components/HomePage/HomePage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sales" element={<SalesManager />} />
          <Route path="/inventory" element={<InventoryManager />} />
          <Route path="/finance" element={<FinanceManager />} />
          <Route path="/hr" element={<HRManager />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

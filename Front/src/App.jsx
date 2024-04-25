import React from 'react';
import './index.css';
import Addition from './pages/Finance/Salary/Addition';
import RoleIncome from './pages/Finance/Salary/RoleIncome';
import BasicSalaries from './pages/Finance/Salary/BasicSalaries';
import BudgetedAllowance from './pages/Finance/Salary/BudgetedAllowance';
import Earning from './pages/Finance/Salary/Earning';
import UserTotalLoane from './pages/Finance/Salary/UserTotalLoane';
import UserMonrhLoan from './pages/Finance/Salary/UserMonrhLoan';
import MonthEpfEtfs from './pages/Finance/Salary/MonthEpfEtfs';
import Deduction from './pages/Finance/Salary/Deduction';
import FoodAllowance from './pages/Finance/Salary/FoodAllowance';
import MonthFoodAllowance from './pages/Finance/Salary/MonthFoodAllowance';
import RoleOTIncome from './pages/Finance/Salary/RoleOTIncome';
import MonthOT from './pages/Finance/Salary/MonthOT';
import Additions from './pages/Finance/Salary/Additions';
import UserNetPay from './pages/Finance/Salary/UserNetPay';
import MonthSalarySheet from './pages/Finance/Salary/MonthSalarySheet';
import SubTotalMonthSalarySheet from './pages/Finance/Salary/SubTotalMonthSalarySheet';
import AllMonthSalarySheet from './pages/Finance/Salary/AllMonthSalarySheet ';



import 'animate.css';


export default function App() {
  return (
    <div>
      <Addition />
      <RoleIncome />
      <BasicSalaries />
      <BudgetedAllowance />
      <Earning />
      <UserTotalLoane />
      <UserMonrhLoan />
      <MonthEpfEtfs />
      <Deduction />
      <FoodAllowance />
      <MonthFoodAllowance />
      <RoleOTIncome />
      <MonthOT />
      <UserNetPay />
      <MonthSalarySheet />
      <SubTotalMonthSalarySheet />
      <AllMonthSalarySheet />







    </div>
  );
}

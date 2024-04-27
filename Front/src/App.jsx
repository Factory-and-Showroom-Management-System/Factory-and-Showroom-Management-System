import React from 'react';
import './index.css';
// import Addition from './pages/Finance/Salary/Addition/Addition';
import RoleIncome from './pages/Finance/Salary/Earning/RoleIncome';
import BasicSalaries from './pages/Finance/Salary/Earning/BasicSalaries';
import Earning from './pages/Finance/Salary/Earning/Earning';
import BudgetedAllowance from './pages/Finance/Salary/Earning/BudgetedAllowance';

import UserTotalLoane from './pages/Finance/Salary/Deduction/UserTotalLoane';
import UserMonrhLoan from './pages/Finance/Salary/Deduction/UserMonrhLoan';
import MonthEpfEtfs from './pages/Finance/Salary/EpfEtf/MonthEpfEtfs';
import Deduction from './pages/Finance/Salary/Deduction/Deduction';

import Addition from './pages/Finance/Salary/Addition/Addition';
import FoodAllowance from './pages/Finance/Salary/Addition/FoodAllowance';
import MonthFoodAllowance from './pages/Finance/Salary/Addition/MonthFoodAllowance';

import RoleOTIncome from './pages/Finance/Salary/NetPay/RoleOTIncome';
import MonthOT from './pages/Finance/Salary/NetPay/MonthOT';
import UserNetPay from './pages/Finance/Salary/NetPay/UserNetPay';

import MonthSalarySheet from './pages/Finance/Salary/MonthSalarySheet';
import SubTotalMonthSalarySheet from './pages/Finance/Salary/SubTotalMonthSalarySheet';
import AllMonthSalarySheet from './pages/Finance/Salary/AllMonthSalarySheet ';


import DashBaord from './pages/Finance/Salary/DashBaord';

import AreaChart01 from './pages/Finance/Salary/Charts/AreaChart01';
import AreaChart02 from './pages/Finance/Salary/Charts/AreaChart02';
import AreaChart03 from './pages/Finance/Salary/Charts/AreaChart03';
import AreaChart04 from './pages/Finance/Salary/Charts/AreaChart04';
import AreaChart05 from './pages/Finance/Salary/Charts/AreaChart05';
import AreaChart06 from './pages/Finance/Salary/Charts/AreaChart06';
import AreaChart07 from './pages/Finance/Salary/Charts/AreaChart07';
import  AreaChart08 from './pages/Finance/Salary/Charts/AreaChart08';





export default function App() {
  return (
    <div>

      <DashBaord />
      {/* <AreaChart01 />  */}
       {/* <AreaChart02 /> */}
        {/* <AreaChart03 /> */}
        {/* <AreaChart04 /> */}
        {/* <AreaChart05 /> */}
        {/* <AreaChart06 /> */}
        {/* <AreaChart07 /> */}
        <AreaChart08 />

       




{/* 
      <RoleIncome />
      <BasicSalaries />
      <BudgetedAllowance />
      <Earning />


      <UserTotalLoane />
      <UserMonrhLoan />
      <MonthEpfEtfs />
      <Deduction />

      <Addition />
      <FoodAllowance />
      <MonthFoodAllowance />


      <RoleOTIncome />
      <MonthOT />
      <UserNetPay />

      
      <MonthSalarySheet />
      <SubTotalMonthSalarySheet />
      <AllMonthSalarySheet /> 


 */}

<UserNetPay />

    </div>
  );
}

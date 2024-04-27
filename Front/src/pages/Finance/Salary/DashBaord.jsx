// import React, { useState } from 'react'
// import { Button } from "flowbite-react";
// import RoleIncome from './Earning/RoleIncome';
// import BasicSalaries from './Earning/BasicSalaries';

// export default function DashBaord() {
//     const [openRole, setRole] = useState(false);
//     const [openbasic, setBasic] = useState(false);

//     const openRoleIncome = () => {
//         setBasic(false);
//         setRole(true);
//     }

//     const openbasicSalary = () => {
//         setRole(false);
//         setBasic(true);

//     }

//     return (
//         <div>
           
//                 <Button onClick={openRoleIncome} className=' bg-red-500 hover:bg-red-800'>Buttpn 1</Button>
             
//                 <Button onClick={openbasicSalary} className=' bg-red-500 hover:bg-red-800'>Button 2</Button>

//                 {openRole && <RoleIncome />}
//                 {openbasic && <BasicSalaries />}
//         </div>
//     )
// }



import React from 'react'
import { Button } from "flowbite-react";
import Button01 from './Buttons/Button01';
import MonthSalarySheet from './MonthSalarySheet';
import Card001 from './Cards/Card001';



export default function DashBaord() {
  return (
    <div>

        <Card001 /> 
        
      {/* <Button01 />
      <MonthSalarySheet /> */}
    </div>
  )
}


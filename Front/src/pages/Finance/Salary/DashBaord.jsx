// import React, { useState } from 'react'
// import { Button } from "flowbite-react";
// import RoleIncome from './RoleIncome';
// import BasicSalaries from './BasicSalaries';

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

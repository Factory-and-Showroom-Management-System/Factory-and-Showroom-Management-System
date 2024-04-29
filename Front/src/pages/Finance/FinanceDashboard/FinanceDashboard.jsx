import React from 'react'
import Card001 from '../Salary/Cards/Card001'
import AreaChart01 from '../Salary/Charts/AreaChart01'
import UserNetPays from '../Salary/NetPay/UserNetPay'
import SalaryCard001 from '../FinanceDashboard/Cards/SalaryCard001'

const FinanceDashboard = () => {
  return (
    <div className='w-full'>
    <div className='flex gap-4'>
        <div className='p-4 mt-3 '>
          <SalaryCard001/>
        </div>
        <div className='pt-4 mt-3 '>
        
        </div>
        <div className='p-4 mt-3 '>
       
        </div>
        <div className='pt-4 mt-3 '>
        
        </div>
    </div>
    <div>
        <AreaChart01/>
    </div>
    <div className='w-full p-5'>
        <UserNetPays/>
    </div>
    </div>
  )
}

export default FinanceDashboard
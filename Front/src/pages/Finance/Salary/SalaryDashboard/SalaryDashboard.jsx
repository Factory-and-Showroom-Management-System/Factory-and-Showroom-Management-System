import React from 'react'
import EarningCard001 from './Cards/EarningCard001'
import DeductionCard001 from './Cards/DeductionCard001'
import AddictionCard001 from './Cards/AddictionCard001'




export default function SalaryDashboard() {
  return (
    <div className='w-full'>
      <div className='flex gap-4'>
        
        <div className='p-4 mt-3 '>
          <EarningCard001 />
          </div>
        
        <div className='p-4 mt-3'>
          <DeductionCard001/>
        </div>

        <div className='p-4 mt-3'>
          <AddictionCard001/>
        </div>

          
        </div>
      </div>
      )
}

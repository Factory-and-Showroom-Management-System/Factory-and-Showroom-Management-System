import React from 'react'
import BasicSalaryEarningTableCart001 from './Carts/BasicSalaryEaringTableCart001'
import BACart001 from './Carts/BACart001'
import EarningCard001 from './Carts/EarningCard001'
import Earning from './Earning'




export default function EaringDash() {
  return (
    <div className='w-full'>
      <div className='flex gap-4 '>

        <div className='p-4 mt-3'>
          <BasicSalaryEarningTableCart001 />
        </div>

        <div className='p-4 mt-3 '>
          <BACart001 />
        </div>

        <div className='p-4 mt-3 '>
          <EarningCard001 />
        </div>
      </div>
      
      <div className='p-4  '>
          <Earning/>
        </div>

    </div>
  )
}

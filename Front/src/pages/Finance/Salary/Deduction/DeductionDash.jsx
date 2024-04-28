import React from 'react'
import DeductionCarts001 from './Cards/DeductionCarts001'
import MonthLoanCards001 from './Cards/MonthLoanCards001'
import Epf8Carts001 from './Cards/Epf8Carts001'
import Deduction from './Deduction'


export default function DeductionDash() {
  return (
    <div className='w-full'>
      <div className='flex gap-4 '>

        <div className='p-4 mt-3'>
          <DeductionCarts001 />
        </div>
        <div className='p-4 mt-3'>
          <MonthLoanCards001 />
        </div>
        <div className='p-4 mt-3'>
          <Epf8Carts001 />
        </div>
      </div>
      <div className='p-4 mt-3'>
        <Deduction />
      </div>

    </div>

  )
}

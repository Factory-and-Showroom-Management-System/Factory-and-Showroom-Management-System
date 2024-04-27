import React from 'react'
import UserNetPays from './UserNetPay'
import TotalNetCart001 from './Cards/TotalNetCart001'

export default function NettPayDash() {
  return (
    <div className='w-full'>
      <div className='flex gap-4 '>

        <div className='p-4 mt-3'>
          <TotalNetCart001 />
        </div>

      </div>



      <div className='p-4 mt-3'>
        <UserNetPays />
      </div>

    </div>
  )
}
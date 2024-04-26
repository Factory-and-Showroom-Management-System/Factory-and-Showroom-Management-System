import React from 'react'
import Addition from './Addition'
import TotalOT from './Cards/TotalOTCard001'
import TotalAddtionCard001 from './Cards/TotalAddtionCard001'
import TotalFoodCard001 from './Cards/TotalFoodCard001'

export default function AdditionDash() {
  return (
    <div className='w-full'>
      <div className='flex gap-4 '>

        <div className='p-4 mt-3'>
          <TotalAddtionCard001 />
        </div>
        <div className='p-4 mt-3'>
          <TotalOT />
        </div>
        <div className='p-4 mt-3'>
          <TotalFoodCard001 />
        </div>
      </div>

      <div className='p-4 mt-3'>
        <Addition />
      </div>

    </div>

  )
}

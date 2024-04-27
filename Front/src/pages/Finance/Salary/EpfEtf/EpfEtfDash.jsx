import React from 'react'
import MonthlyEpfEtf from '../EpfEtf/MonthEpfEtfs'
import BasicSalaryetfepfTableCart002 from './Cards/BasicSalaryetfepfTableCart002'
import Epf8Cart002 from '../EpfEtf/Cards/Epf8Cart002'
import Epf12Cart001 from './Cards/Epf12Cart001'
import Epf3Cart001 from './Cards/Etf3Cart001'
import Totalepf8epf12Cart001 from './Cards/Totalepf8pf12Cart001'

export default function EpfEtfDash() {
  return (
    <div className='w-full'>
      <div className='flex gap-1 '>

        <div className='p-4 mt-3'>
          <BasicSalaryetfepfTableCart002 />
        </div>

        <div className='p-4 mt-3 '>
          <Epf8Cart002 />
        </div>

        <div className='p-4 mt-3 '>
          <Epf12Cart001 />
        </div>

        <div className='p-4 mt-3 '>
          <Epf3Cart001 />
        </div>
      </div>

      <div className='flex gap-1 '>
        <div className='p-4 mt-3 '>
          <Totalepf8epf12Cart001 />
        </div>
      </div>

      <div className='p-4  '>
        <MonthlyEpfEtf />
      </div>

    </div>
  )
}

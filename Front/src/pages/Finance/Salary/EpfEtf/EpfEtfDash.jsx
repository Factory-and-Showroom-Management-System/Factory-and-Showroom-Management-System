import React from 'react'
import MonthlyEpfEtf from '../EpfEtf/MonthEpfEtfs'
import BasicSalaryetfepfTableCart002 from './Cards/BasicSalaryetfepfTableCart002'
import Epf8Cart002 from '../EpfEtf/Cards/Epf8Cart002'
import Epf12Cart001 from './Cards/Epf12Cart001'
import Epf3Cart001 from './Cards/Etf3Cart001'
import Totalepf8epf12Cart001 from './Cards/Totalepf8pf12Cart001'

import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2, // Delay the animation to make it more noticeable
      when: "beforeChildren", // Animate children after the parent
      staggerChildren: 0.2, // Add a small stagger effect to each child
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


export default function EpfEtfDash() {
  return (
    <motion.div
    className='w-full'
    variants={container}
    initial='hidden'
    animate='visible'
    exit='hidden'
  >
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

      <motion.div className='p-4  '>
        <MonthlyEpfEtf />
      </motion.div>

   </motion.div>
  )
}

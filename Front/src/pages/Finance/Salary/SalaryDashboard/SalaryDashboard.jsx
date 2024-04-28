import React from 'react'
import EarningCard001 from './Cards/EarningCard001'
import DeductionCard001 from './Cards/DeductionCard001'
import AddictionCard001 from './Cards/AddictionCard001'
import NettPayCard001 from './Cards/NettPayCard001'


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



export default function SalaryDashboard() {
  return (

    <motion.div
      className='w-full'
      variants={container}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <div className='flex gap-1'>

        <div className='p-4 mt-3 '>
          <EarningCard001 />
        </div>

        <div className='p-4 mt-3'>
          <DeductionCard001 />
        </div>

        <div className='p-4 mt-3'>
          <AddictionCard001 />
        </div>

        <div className='p-4 mt-3'>
          <NettPayCard001 />
        </div>


      </div>
    </motion.div>
  )
}

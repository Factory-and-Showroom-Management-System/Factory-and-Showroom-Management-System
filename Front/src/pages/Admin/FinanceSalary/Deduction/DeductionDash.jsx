import React from 'react'
import DeductionCarts001 from './Cards/DeductionCarts001'
import MonthLoanCards001 from './Cards/MonthLoanCards001'
import Epf8Carts001 from './Cards/Epf8Carts001'
import Deduction from './Deduction'


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


export default function DeductionDash() {
  return (
    <motion.div
    className='w-full'
    variants={container}
    initial='hidden'
    animate='visible'
    exit='hidden'
  >
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
      <motion.div className='p-4 mt-3'>
        <Deduction />
      </motion.div>

    </motion.div>

  )
}

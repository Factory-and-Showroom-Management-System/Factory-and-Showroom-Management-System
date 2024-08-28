import React from 'react'
import BasicSalaryEarningTableCart001 from './Carts/BasicSalaryEaringTableCart001'
import BACart001 from './Carts/BACart001'
import EarningCard001 from './Carts/EarningCard001'
import Earning from './Earning'

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


export default function EaringDash() {
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
          <BasicSalaryEarningTableCart001 />
        </div>

        <div className='p-4 mt-3 '>
          <BACart001 />
        </div>

        <div className='p-4 mt-3 '>
          <EarningCard001 />
        </div>
      </div>

      <motion.div className='p-4  '>
        <Earning />
      </motion.div>

    </motion.div>
  )
}

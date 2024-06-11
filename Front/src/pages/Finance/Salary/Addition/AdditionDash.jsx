import React from 'react'
import Addition from './Addition'
import TotalOT from './Cards/TotalOTCard001'
import TotalAddtionCard001 from './Cards/TotalAddtionCard001'
import TotalFoodCard001 from './Cards/TotalFoodCard001'

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

export default function AdditionDash() {
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
          <TotalAddtionCard001 />
        </div>
        <div className='p-4 mt-3'>
          <TotalOT />
        </div>
        <div className='p-4 mt-3'>
          <TotalFoodCard001 />
        </div>
      </div>

      <motion.div className='p-4 mt-3'>
        <Addition />
      </motion.div>

   </motion.div>

  )
}

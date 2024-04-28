import React from 'react'
import Card001 from '../Salary/Cards/Card001'
import AreaChart01 from '../Salary/Charts/AreaChart01'
import UserNetPays from '../Salary/NetPay/UserNetPay'
import SalaryCard001 from '../FinanceDashboard/Cards/SalaryCard001'
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

const FinanceDashboard = () => {
  return (
    <motion.div
      className='w-full'
      variants={container}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <div className='flex gap-4'>
        <div className='p-4 mt-3 '>
          <SalaryCard001 />
        </div>
        <div className='pt-4 mt-3 '>

        </div>
        <div className='p-4 mt-3 '>

        </div>
        <div className='pt-4 mt-3 '>

        </div>
      </div>
      <div>
        <AreaChart01 />
      </div>
      <div className='w-full p-5'>
        <UserNetPays />
      </div>
    </motion.div>
  )
}

export default FinanceDashboard
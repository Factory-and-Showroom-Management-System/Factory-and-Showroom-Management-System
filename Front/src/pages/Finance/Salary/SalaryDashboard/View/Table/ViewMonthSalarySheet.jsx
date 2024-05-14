

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Label } from "flowbite-react";
import bannerLogoPrint from '../Table/bannerLogoPrint.png';
import { motion } from 'framer-motion';
import { Button } from "flowbite-react";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaDownload } from "react-icons/fa";




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




export default function ViewMonthSalarySheet({ onClose }) {
    const [openModal, setOpenModal] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    //current date with time (AM or PM)
    const date = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    const CurrentMonth = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',

        hour12: true
    });

    //auto genarate invoice Number fist must add PMS other auto add number








    useEffect(() => {
        axios.get('http://localhost:3000/salary/showmonthsalarysheet')
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.error('Failed to fetch data:', err);
                setError('Failed to load data');
            });

        // Load the last invoice number from local storage or start with 233
        const lastInvoiceNum = parseInt(localStorage.getItem('lastInvoiceNumber') || '233');
        const newInvoiceNum = `PMS_${lastInvoiceNum + 1}`;
        setInvoiceNumber(newInvoiceNum);

        // Save the new invoice number back to local storage
        localStorage.setItem('lastInvoiceNumber', lastInvoiceNum + 1);
    }, []);

    const basicSalary = data.reduce((acc, curr) => acc + curr.basicSalary, 0);
    const allowances = data.reduce((acc, curr) => acc + curr.baValue, 0);
    //BTotal = basicSalary+allowances
    const BTotal = basicSalary + allowances;
    //month loan deduction
    const monthLoanDeduction = data.reduce((acc, curr) => acc + curr.monthLoan, 0);
    //EPF 8%
    const EPF8 = data.reduce((acc, curr) => acc + curr.epf8, 0);
    //total deductions
    const totalDeductions = monthLoanDeduction + EPF8;
    //food allowance totalAllowance
    const totalAllowance = data.reduce((acc, curr) => acc + curr.totalAllowance, 0);
    //OT Commission totalOT 
    const totalOT = data.reduce((acc, curr) => acc + curr.totalOT, 0);
    //total additions
    const totalAdditions = totalAllowance + totalOT;

    //total Earning BTotal+totalAdditions
    const totalEarning = BTotal + totalAdditions;
    //netpay totalEarning-totalDeductions
    const netPay = totalEarning - totalDeductions;
    //total EPF12 epf12
    const EPF12 = data.reduce((acc, curr) => acc + curr.epf12, 0);
    //total ETF3 etf3
    const ETF3 = data.reduce((acc, curr) => acc + curr.etf3, 0);
    //total EPF12+ETF3
    const totalEPFETF = EPF12 + ETF3;








    const handleClose = () => {
        setOpenModal(false);
        if (onClose) onClose(); // Safeguard to ensure onClose is provided
    }

    return (
        <motion.div className='w-full' variants={container} initial='hidden' animate='visible' exit='hidden'>

            <Modal show={openModal} onClose={handleClose} size="5xl">
            
                <Modal.Header></Modal.Header>

                <Modal.Body>

                    <motion.div className='w-full' variants={container} initial='hidden' animate='visible' exit='hidden'>
                        <div className='w-full h-full flex pr-20'>
                            <div className="max-w-xl ">
                                <img src={bannerLogoPrint} alt="Monthly Salary Sheet" />
                            </div>
                        </div>

                        <div className='mt-5 border-t-2 flex-row flex pt-5'>
                            <div className='basis-2/3'></div>
                            <motion.div variants={container} initial='hidden' animate='visible' exit='hidden' className=' basis-1/3 pl-10'>
                                <div>
                                    <Label className='font-bold text-slate-600'>Invoice No :</Label>
                                    <Label className='text-slate-500'> {invoiceNumber}</Label>
                                </div>
                                <div>
                                    <Label className='font-bold text-slate-600'>Invoice Date :</Label>
                                    <Label className='text-slate-500'> {date}</Label>
                                </div>
                            </motion.div>
                        </div>

                        <div className='mt-5 border-t-2 flex-row flex pt-5 place-content-center'>
                            <div>
                                <Label className='text-2xl text-sky-600 font-bold pl-10'>DOLPHIN <Label className='font-bold text-2xl text-green-500'>ECO</Label> PACK (PVT) LTD</Label>
                            </div>
                        </div>

                        <div>
                            <div className='flex place-content-center pl-10'>
                                <Label className='text-slate-600 font-bold'>MONTHLY SALARY SHEETS :</Label>
                                <Label className='text-slate-800 font-bold'> {CurrentMonth}</Label>
                            </div>
                        </div>
                        <motion.div variants={container} initial='hidden' animate='visible' exit='hidden' className='justify-center pl-48'>
                            {error && <p className="text-red-500">{error}</p>}
                            <table className="w-full mt-10">
                                <thead>
                                    <tr>
                                        <td className="text-lg font-bold text-slate-600 text-left">Description</td>
                                        <td className="text-lg font-bold text-slate-600 text-left w-min">Amount</td>
                                    </tr>
                                    <div className='mb-4'></div>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-stone-600'><strong>Earning</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Basic Salary</td>
                                        <td>Rs. {basicSalary.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Budgeted Allowance</td>
                                        <td>Rs. {allowances.toFixed(2)}</td>
                                    </tr>

                                    <tr>
                                        <td className='pl-20 font-medium text-gray-700'>Total</td>
                                        <td><strong><div className='w-32 border-t-2 text-gray-700'>Rs. {BTotal.toFixed(2)}</div></strong></td>
                                    </tr>


                                    <div className='mb-4'></div>
                                    <tr>
                                        <td className='text-stone-600'><strong>Additions</strong></td>
                                    </tr>

                                    <tr>
                                        <td>Food Allowance</td>
                                        <td>Rs. {totalAllowance.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>OT Commission</td>
                                        <td>Rs. {totalOT.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className='pl-20 font-medium text-green-500'>Total Additions</td>
                                        <td><strong><div className='w-32 border-t-2 text-green-500'>Rs. {totalAdditions.toFixed(2)}</div></strong></td>
                                    </tr>

                                    <div className='mb-4'></div>

                                    <tr>
                                        <td className='pl-20 text-gray-700 font-medium'>Total Earnings</td>
                                        <td className='text-gray-700'><strong>Rs. {totalEarning.toFixed(2)}</strong></td>
                                    </tr>

                                    <div className='mb-4'></div>

                                    <tr>
                                        <td className='text-stone-600'><strong>Deductions</strong></td>

                                    </tr>

                                    <tr>
                                        <td>Loan Deduction</td>
                                        <td>Rs. {monthLoanDeduction.toFixed(2)}</td>

                                    </tr>
                                    <tr>
                                        <td>EPF 8%</td>
                                        <td>Rs. {EPF8.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className='pl-20 text-red-600 font-medium'>Total Deduction</td>
                                        <td><strong><div className='w-32 border-t-2 text-red-600'>Rs. {totalDeductions.toFixed(2)}</div></strong></td>
                                    </tr>
                                    <div className='mb-4'></div>

                                    <tr>
                                        <td className='text-blue-700'><strong>Nett Pay</strong></td>
                                        <td className='text-blue-700'><strong>Rs. {netPay.toFixed(2)}</strong><div className='w-32 border-t-2 pb-1'></div><div className='w-32 border-t-2'></div></td>
                                        <td></td>
                                    </tr>
                                    <div className='mb-4'></div>

                                    <tr>
                                        <td className='text-stone-600'><strong>Company Contribution</strong></td>

                                    </tr>
                                    <tr>
                                        <td>EPF Company Contribution 12%</td>
                                        <td>Rs. {EPF12.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>ETF Company Contribution 3%</td>
                                        <td>Rs. {ETF3.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className='pl-20 font-medium text-gray-700'>Total EPF,ETF </td>
                                        <td><strong><div className='w-32 border-t-2 text-gray-700'>Rs. {totalEPFETF.toFixed(2)}</div></strong></td>
                                    </tr>



                                    <div className='mb-5 '></div>

                                    <tr>
                                        <td ><div className='w-200 border-t-2'></div> </td>
                                        <td ><div className='w-32 border-t-2'></div> </td>

                                    </tr>

                                    <div className='mb-5 '></div>

                                    <tr>
                                        <td className='text-stone-600'><strong>Bank Account Details</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Union Bank - Matara</td>
                                        <td>003 020 100 007 8822</td>
                                    </tr>
                                    <div className='mb-4'></div>

                                    <tr>
                                        <td className='text-blue-700'><strong>Nett Pay</strong></td>
                                        <td className='text-blue-700 '><strong>Rs. {netPay.toFixed(2)}</strong></td>
                                    </tr>
                                    <div className='mb-10'></div>
                                </tbody>
                            </table>
                        </motion.div>

                        <div className='border-t-2 flex-row flex pt-12'></div>
                        <div>
                            <div className='pl-28'>
                                <Label className='text-slate-500'>Owner Signature</Label>
                            </div>
                            <div className='pl-28 pt-7'>
                                <Label className='text-slate-500'>......................................................</Label>
                            </div>
                        </div>

                        <div className='mt-5 border-t-2 flex-row flex pt-5 place-content-center pl-10'>
                            <div>
                                <Label className='text-lg text-slate-600'>DOLPHIN ECO PACK (PVT) LTD</Label>
                            </div>
                        </div>
                    </motion.div>
                </Modal.Body>
            </Modal>
        </motion.div>
    );
}



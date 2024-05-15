import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Label } from "flowbite-react";
import bannerLogoPrint from '../Table/bannerLogoPrint.png';
import { motion } from 'framer-motion';
import { TiArrowBackOutline } from "react-icons/ti";
import { FaDownload } from "react-icons/fa";

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2,
            when: "beforeChildren",
            staggerChildren: 0.2,
        },
    },
};

export default function OneUserViewAllMSSheet({ id, onClose }) {
    const [openModal, setOpenModal] = useState(true);
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data from API...');
                const response = await axios.get(`http://localhost:3000/salary/showallmonthsalarysheet/${id}`);
                console.log('API response:', response.data);
                setData(response.data); // Set the received data to the state
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setError(`Failed to load data: ${err.message}`);
            }
        };

        fetchData();

        const lastInvoiceNum = parseInt(localStorage.getItem('lastInvoiceNumber') || '233');
        const newInvoiceNum = `PMS_${lastInvoiceNum + 1}`;
        setInvoiceNumber(newInvoiceNum);
        localStorage.setItem('lastInvoiceNumber', lastInvoiceNum + 1);
    }, [id]);

    const handleClose = () => {
        setOpenModal(false);
        if (onClose) onClose();
    }

    // Calculations based on data
    const basicSalary = data.allBasicSalary || 0;
    const allowances = data.allBaValue || 0;
    const BTotal = basicSalary + allowances;
    const monthLoanDeduction = data.allMonthLoan || 0;
    const EPF8 = data.allEpf8 || 0;
    const totalDeductions = monthLoanDeduction + EPF8;
    const totalAllowance = data.allTotalAllowance || 0;
    const totalOT = data.allTotalOT || 0;
    const totalAdditions = totalAllowance + totalOT;
    const totalEarning = BTotal + totalAdditions;
    const netPay = totalEarning - totalDeductions;
    const EPF12 = data.allEpf12 || 0;
    const ETF3 = data.allEtf3 || 0;
    const totalEPFETF = EPF12 + ETF3;

    const invoiceDate = data.monthCurrentDate;
    const formattedDate = new Date(invoiceDate).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
    

    return (
        <motion.div className='w-full' variants={container} initial='hidden' animate='visible' exit='hidden'>
            <Modal show={openModal} onClose={handleClose} size="5xl">
                <Modal.Header />
                <Modal.Body>
                    <motion.div className='w-full' variants={container} initial='hidden' animate='visible' exit='hidden'>
                        <div className='w-full h-full flex pr-20'>
                            <div className="max-w-xl">
                                <img src={bannerLogoPrint} alt="Monthly Salary Sheet" />
                            </div>
                        </div>

                        <div className='mt-5 border-t-2 flex-row flex pt-5'>
                            <div className='basis-3/1'></div>
                            <motion.div variants={container} initial='hidden' animate='visible' exit='hidden' className='basis-1/3 pl-10'>
                                <div>
                                    <Label className='font-bold text-slate-600'>Employee No :</Label>
                                    <Label className='text-slate-500'> {data.userId || '?'}</Label>
                                </div>
                                <div>
                                    <Label className='font-bold text-slate-600'>Employee Name :</Label>
                                    <Label className='text-slate-500'> {data.name || '?'}</Label>
                                </div>
                            </motion.div>
                            <div className='basis-1/3'></div>
                            <motion.div variants={container} initial='hidden' animate='visible' exit='hidden' className='basis-1/3 pl-10'>
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
                                <Label className='text-slate-600 font-bold'>MONTHLY SALARY SHEETS </Label>
                                <Label className='text-slate-800 font-bold'>: {formattedDate}</Label>
                            </div>
                        </div>

                        <motion.div variants={container} initial='hidden' animate='visible' exit='hidden' className='justify-center pl-48'>
                            {error && <p className="text-red-500">{error}</p>}
                            <table className="w-full mt-10">
                                <thead>
                                    <tr>
                                        <th className="text-lg font-bold text-slate-600 text-left pb-2">Description</th>
                                        <th className="text-lg font-bold text-slate-600 text-left w-min">Amount</th>
                                    </tr>
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
                                        <td>Bank Name</td>
                                        <td>?</td>
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
                            <div className='pl-40'>
                                <Label className='text-slate-500'>Owner Signature</Label>
                                <Label className='text-slate-500 pl-96'>Employee Signature</Label>
                            </div>
                            <div className='pl-32 pt-7'>
                                <Label className='text-slate-500'>......................................................</Label>
                                <Label className='text-slate-500 pl-80'>........................................................</Label>
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

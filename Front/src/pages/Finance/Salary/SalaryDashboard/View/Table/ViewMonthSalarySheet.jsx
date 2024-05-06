import React from 'react'
import { Label, Modal } from "flowbite-react";  // Removed unused imports for clarity
import { useState } from 'react';
import bannerLogoPrint from '../Table/bannerLogoPrint.png';  // Correct import statement

export default function ViewMonthSalarySheet({ onClose }) {
    const [openModal, setOpenModal] = useState(true);

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    }

    return (
        <>
            <Modal show={openModal} onClose={handleClose} size="5xl">
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <div className='w-full h-full flex pr-20'>
                        <div className="max-w-ms">
                            <img src={bannerLogoPrint} alt="Monthly Salary Sheet" />
                        </div>
                    </div>

                    <div className='mt-5 border-t-2 flex-row flex pt-5 '>
                        <div className=' basis-2/3 '></div>

                        <div className=' basis-1/3 pl-10'>
                            <div className=' '>
                                <Label className='font-bold text-slate-600 '>Invoice No :</Label>
                                <Label className='text-slate-500'> PMS_2024_00233</Label>
                            </div>

                            <div className=''>
                                <Label className='font-bold  text-slate-600 '>Invoice Date :</Label>
                                <Label className='text-slate-500'> 2024-05-02 05:25 PM</Label>
                            </div>
                        </div>

                    </div>


                    <div className='mt-5 border-t-2 flex-row flex pt-5  place-content-center '>
                        <div className=' '>
                            <Label className='text-2xl text-sky-600 font-bold pl-10'>DOLPHIN <Label className='font-bold text-2xl text-green-500'>ECO</Label> PACK (PVT) LTD</Label>

                        </div>

                    </div>

                    <div >
                        <div className='flex place-content-center pl-10'>
                            <Label className='text-slate-600 font-bold '>MONTHLY SALARY SHEETS : </Label>
                            <Label className='text-slate-800 font-bold '> MAY 2024</Label>
                        </div>
                    </div>
                    <div className='justify-center pl-48'>
                        {/* Salary Table */}
                        <table className=" w-full mt-10 ">

                            <div className='mb-5'></div>
                            <thead>
                                <tr>
                                    <td className="text-lg font-bold text-slate-600 text-left ">Description</td>
                                    <td className="text-lg font-bold text-slate-600  text-left w-min ">Amount</td>
                                </tr>
                            </thead>

                            <tbody>
                                <tr >
                                    <td className='text-stone-600'><strong>Earning</strong></td>
                                </tr>
                                <tr>
                                    <td>Basic Salary</td>
                                    <td>Rs. 30,000.00</td>
                                </tr>
                                <tr>
                                    <td>Budgeted Allowance</td>
                                    <td>Rs. 2,500.00</td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td className='pl-20 font-medium text-gray-700'>Total</td>
                                    <td><strong><div className='w-32 border-t-2 text-gray-700'>Rs. 32,500.00</div></strong></td>
                                </tr>


                                <div className='mb-4'></div>
                                <tr>
                                    <td className='text-stone-600'><strong>Additions</strong></td>
                                </tr>
                                <tr>
                                    <td>Food Sale Commission</td>
                                    <td>Rs. 23,038.65</td>
                                </tr>
                                <tr>
                                    <td>Food Allowance</td>
                                    <td>Rs. 3,100.00</td>
                                </tr>
                                <tr>
                                    <td>Bar Sale Commission</td>
                                    <td>Rs. 11,952.96</td>
                                </tr>
                                <tr>
                                    <td className='pl-20 font-medium text-green-500'>Total Additions</td>
                                    <td><strong><div className='w-32 border-t-2 text-green-500'>Rs. 38,091.62</div></strong></td>
                                </tr>

                                <div className='mb-4'></div>
                               
                                <tr>
                                    <td className='pl-20 text-gray-700 font-medium'>Total Earnings</td>
                                    <td className='text-gray-700'><strong>Rs. 70,591.62</strong></td>
                                </tr>

                                <div className='mb-4'></div>

                                <tr>
                                    <td className='text-stone-600'><strong>Deductions</strong></td>
                                    
                                </tr>
                                <tr>
                                    <td>Festival Advances</td>
                                    <td>Rs. 3,000.00</td>
                                </tr>

                               

                                <tr>
                                    <td>Loan Deduction</td>
                                    <td>Rs. 3,00.00</td>

                                </tr>
                                <tr>
                                    <td>EPF 8%</td>
                                    <td>Rs. 2,600.00</td>
                                </tr>
                                <tr>
                                    <td className='pl-20 text-red-600 font-medium'>Total Deduction</td>
                                    <td><strong><div className='w-32 border-t-2 text-red-600'>Rs. 5,600.00</div></strong></td>
                                </tr>
                                <div className='mb-4'></div>

                                <tr>
                                    <td className='text-blue-700'><strong>Nett Pay</strong></td>
                                    <td className='text-blue-700'><strong>Rs. 64,991.62</strong><div className='w-32 border-t-2 pb-1'></div><div className='w-32 border-t-2'></div></td>
                                    <td></td>
                                </tr>
                                <div className='mb-4'></div>

                                <tr>
                                    <td className='text-stone-600'><strong>Company Contribution</strong></td>
                                    
                                </tr>
                                <tr>
                                    <td>EPF Company Contribution 12%</td>
                                    <td>Rs. 3,900.00</td>
                                </tr>
                                <tr>
                                    <td>ETF Company Contribution 3%</td>
                                    <td>Rs. 975.00</td>
                                </tr>
                                <tr>
                                    <td className='pl-20 font-medium text-gray-700'>Total EPF,ETF </td>
                                    <td><strong><div className='w-32 border-t-2 text-gray-700'>Rs. 4,875.00</div></strong></td>
                                </tr>


                                <div className='mb-4'></div>

                                <tr>
                                    <td className='text-stone-600'><strong>Cost to the company</strong></td>
                                    <td className='text-gray-700'><strong>Rs. 52,427.96</strong></td>
                                </tr>
                               
                                <div className='mb-10 '></div>
                                
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
                                    <td className='text-blue-700 '><strong>Rs. 64,991.62</strong></td>
                                </tr>
                                <div className='mb-10'></div>
                            </tbody>
                        </table>
                    </div>



                    <div className=' border-t-2 flex-row flex pt-12'></div>
                    <div >
                        <div className='pl-28'>
                            <Label className='text-slate-500 '>Owner Signature</Label>
                        </div>



                        <div className='pl-28 pt-7'>
                            <Label className='text-slate-500 '>......................................................</Label>
                        </div>
                    </div>

                    <div className='mt-5 border-t-2 flex-row flex pt-5  place-content-center pl-10'>
                        <div className=' '>
                            <Label className='text-lg text-slate-600 '>DOLPHIN ECO PACK (PVT) LTD</Label>

                        </div>

                    </div>

                </Modal.Body>
            </Modal>

        </>
    );
}    

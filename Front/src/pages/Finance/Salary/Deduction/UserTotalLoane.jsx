import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from "flowbite-react";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { TiArrowBackOutline } from "react-icons/ti";
import ToBePaidCarts001 from './Cards/ToBePaidCarts001';


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
  

const MySwal = withReactContent(Swal);

export default function UserTotalLoans() {
    const [loans, setLoans] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    
    const navigate = useNavigate();

    const handleDashboard = () => {
        navigate('/finance?tab=salarydash');
    };

    const handleDeduction = () => {
        navigate('/finance?tab=deductiondash');
    };




    const handleSubmit = async (event) => {
        //Fetch the data from the API  run to post: http://localhost:3000/salary/addsalary
        const response = await axios.post('http://localhost:3000/salary/addsalary', {
        });
        console.log(response);
    };


    const handleSubmitEarning = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addearning', {
        });
        console.log(response);
    };



    const handleSubmitUserLoan = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/autoaddusermonthloan', {
        });
        console.log(response);
    };

    const handleSubmitDeduct = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/autoadddeduction', {
        });
        console.log(response);
    };


    const handleSubmitEpsEtf = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/autoaddmonthepfetf', {
        });
        console.log(response);
    };



    const handleSubmitMonthFoodAllwance = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/autoaddmonthfoodallowance', {
        });
        console.log(response);
    };



    const handleSubmitMonthOT = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/autoaddmonthot', {
        });
        console.log(response);
    };


    const handleSubmitAdditon = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addadditions', {
        });
        console.log(response);
    };


    const handleSubmitNetPay = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addusernetpay', {
        });
        console.log(response);
    };


    const handleSubmitMonthSalarySheet = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addmonthsalarysheet', {
        });
        console.log(response);
    };

    const handleSubmitSubMonthSalarySheet = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addsubtotalmonthsalarysheet', {
        });
        console.log(response);
    };


    const handleSubmitAllMonthSalarySheet = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addallmonthsalarysheet', {
        });
        console.log(response);
    };


    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
            const timeString = now.toLocaleTimeString('en-US', {
                hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
            });
            setCurrentDateTime(`${dateString}, ${timeString}`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        fetchLoans();
        handleSubmit();
        handleSubmitEarning();
        handleSubmitUserLoan();
        handleSubmitDeduct();
        handleSubmitEpsEtf();
        handleSubmitMonthFoodAllwance();
        handleSubmitMonthOT();
        handleSubmitAdditon();
        handleSubmitNetPay();
        handleSubmitMonthSalarySheet();
        handleSubmitSubMonthSalarySheet();
        handleSubmitAllMonthSalarySheet();

    }, []);




    const fetchLoans = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:3000/salary/showusertotalloan');
            setLoans(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch loans:', error);
            setError('Failed to fetch loans');
            setLoading(false);
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const handleAdd = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Add New Loan',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="User ID" type="number">
                <input id="swal-input2" class="swal2-input" placeholder="Name">
                <input id="swal-input3" class="swal2-input" type="date" placeholder="Loan Date">
                <input id="swal-input4" class="swal2-input" type="number" placeholder="Loan Amount">
                <input id="swal-input5" class="swal2-input" type="number" placeholder="To Be Paid">
                <input id="swal-input6" class="swal2-input" type="number" placeholder="Loan Rate Percentage">
                <input id="swal-input7" class="swal2-input" placeholder="Loan Duration">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Add',
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value, // User ID
                    document.getElementById('swal-input2').value, // Name
                    document.getElementById('swal-input3').value, // Loan Date
                    parseFloat(document.getElementById('swal-input4').value), // Loan Amount
                    parseFloat(document.getElementById('swal-input5').value), // To Be Paid
                    parseFloat(document.getElementById('swal-input6').value), // Loan Rate Percentage
                    document.getElementById('swal-input7').value // Loan Duration
                ]
            }
        });

        if (formValues) {
            try {
                await axios.post(`http://localhost:3000/salary/addusertotalloan`, {
                    userId: parseInt(formValues[0], 10), // Convert User ID to an integer
                    name: formValues[1],
                    loanDate: formValues[2],
                    loanAmount: formValues[3],
                    toBePaid: formValues[4],
                    loanRatePresentage: formValues[5],
                    loanDuration: formValues[6]
                });
                MySwal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: 'New loan has been added.',
                });
                fetchLoans();
                handleSubmit();
                handleSubmitEarning();
                handleSubmitUserLoan();
                handleSubmitDeduct();
                handleSubmitEpsEtf();
                handleSubmitMonthFoodAllwance();
                handleSubmitMonthOT();
                handleSubmitAdditon();
                handleSubmitNetPay();
                handleSubmitMonthSalarySheet();
                handleSubmitSubMonthSalarySheet();
                handleSubmitAllMonthSalarySheet();




            } catch (error) {
                console.error('Failed to add loan:', error.response ? error.response.data : error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to add!',
                    text: 'Adding new loan failed: ' + (error.response ? error.response.data.message : error.message),
                });
            }
        }
    };

    const handleEdit = async (id, currentData) => {
        const { value: formValues } = await MySwal.fire({
            title: 'Edit Loan',
            html: `
                <input id="swal-input1" class="swal2-input" type="number" value="${currentData.userId}">
                <input id="swal-input2" class="swal2-input" value="${currentData.name}">
                <input id="swal-input3" class="swal2-input" type="date" value="${currentData.loanDate.slice(0, 10)}">  
                <input id="swal-input4" class="swal2-input" type="number" value="${currentData.loanAmount}">
                <input id="swal-input5" class="swal2-input" type="number" value="${currentData.toBePaid}">
                <input id="swal-input6" class="swal2-input" type="number" value="${currentData.loanRatePresentage}">
                <input id="swal-input7" class="swal2-input" value="${currentData.loanDuration}">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save Changes',
            preConfirm: () => {
                return [
                    parseInt(document.getElementById('swal-input1').value, 10),
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value,
                    parseFloat(document.getElementById('swal-input4').value),
                    parseFloat(document.getElementById('swal-input5').value),
                    parseFloat(document.getElementById('swal-input6').value),
                    document.getElementById('swal-input7').value
                ]
            }
        });

        if (formValues) {
            try {
                await axios.put(`http://localhost:3000/salary/updateusertotalloan/${id}`, {
                    userId: formValues[0],
                    name: formValues[1],
                    loanDate: formValues[2],
                    loanAmount: formValues[3],
                    toBePaid: formValues[4],
                    loanRatePresentage: formValues[5],
                    loanDuration: formValues[6]
                });
                MySwal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Loan has been successfully updated.',
                });
                fetchLoans();
                handleSubmit();
                handleSubmitEarning();
                handleSubmitUserLoan();
                handleSubmitDeduct();
                handleSubmitEpsEtf();
                handleSubmitMonthFoodAllwance();
                handleSubmitMonthOT();
                handleSubmitAdditon();
                handleSubmitNetPay();
                handleSubmitMonthSalarySheet();
                handleSubmitSubMonthSalarySheet();
                handleSubmitAllMonthSalarySheet();



            } catch (error) {
                console.error('Failed to update loan:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to update!',
                    text: 'Updating loan failed: ' + (error.response ? error.response.data.message || error.response.data : error.message),
                });
            }
        }
    };


    const handleRemove = async (id) => {
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/salary/deleteusertotalloan/${id}`);
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'Loan has been deleted.',
                    icon: 'success',
                });
                fetchLoans();
                handleSubmit();
                handleSubmitEarning();
                handleSubmitUserLoan();
                handleSubmitDeduct();
                handleSubmitEpsEtf();
                handleSubmitMonthFoodAllwance();
                handleSubmitMonthOT();
                handleSubmitAdditon();
                handleSubmitNetPay();
                handleSubmitMonthSalarySheet();
                handleSubmitSubMonthSalarySheet();
                handleSubmitAllMonthSalarySheet();



            } catch (error) {
                console.error('Failed to delete loan:', error);
                MySwal.fire({
                    title: 'Failed!',
                    text: 'Failed to delete loan.',
                    icon: 'error',
                });
            }
        }
    };


    //searching filter-----------------------------------------------------------------------------------------   
    const filteredLoans = searchTerm
        ? loans.filter(loan =>
            (loan.name && loan.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (loan.userId && loan.userId.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : loans;




    const totalLoanAmount = filteredLoans.reduce((total, loan) => total + loan.loanAmount, 0);
    const totalToBePaid = filteredLoans.reduce((total, loan) => total + loan.toBePaid, 0);

    // Calculate the indices of the first and last rows on the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    // Slice the data to get only the rows for the current page
    const currentRows = filteredLoans.slice(indexOfFirstRow, indexOfLastRow);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredLoans.length / rowsPerPage);

    const handlePrevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    const handleNextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);

    return (
        <motion.div
        className='w-full'
        variants={container}
        initial='hidden'
        animate='visible'
        exit='hidden'
      >
        <div className="relative overflow-x-auto sm:rounded-lg ">

            <div className='w-full'>
                <div className='flex gap-4 '>

                    <div className='p-4 mt-3'>
                        <ToBePaidCarts001 />
                    </div>

                </div>
            </div>

            <div className='p-5'>

                    <h1 className="  text-3xl text-blue-500">User Total Loans Table: {currentDateTime}</h1>

                    <div className='mb-2 mt-5 flex items-center'>

                        <Button onClick={handleAdd} className='bg-green-600'>
                            <IoIosAddCircle className="mr-2 h-5 w-5 " />
                            Add Loan
                        </Button>

                        {/* <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Add Loan
                        </button> */}


                        <div className="relative ml-4">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="w-80 h-10 pl-10 pr-3 py-2 border border-blue-400 rounded-lg text-blue-500 focus:ring-blue-500 "
                                placeholder="Search by Name or User ID"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <Button.Group outline className='ml-2'>
                                <Button color="gray" onClick={handleDeduction} >
                                    <TiArrowBackOutline className="mr-3 h-4 w-4 mt-0.5" />
                                    Back
                                </Button>

                                <Button color="gray" onClick={handleDashboard}>
                                    <TiArrowBackOutline className="mr-3 h-4 w-4 mt-0.5" />
                                    Dashboard
                                </Button>


                            </Button.Group>
                        </div>

                    </div>

                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-white uppercase bg-blue-600">
                            <tr>
                                <th scope="col" className="px-6 py-7">ID</th>
                                <th scope="col" className="px-6 py-3">User ID</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Loan Date</th>
                                <th scope="col" className="px-6 py-3">Loan Amount</th>
                                <th scope="col" className="px-6 py-3">To Be Paid</th>
                                <th scope="col" className="px-6 py-3">Loan Rate (%)</th>
                                <th scope="col" className="px-6 py-3">Loan Duration</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((loan) => (
                                <tr key={loan.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                    <td className="px-6 py-4">{loan.id}</td>
                                    <td className="px-6 py-4">{loan.userId}</td>
                                    <td className="px-6 py-4">{loan.name}</td>
                                    <td className="px-6 py-4">{formatDate(loan.loanDate)}</td>
                                    <td className="px-6 py-4">Rs. {loan.loanAmount.toFixed(2)}</td>
                                    <td className="px-6 py-4">Rs. {loan.toBePaid.toFixed(2)}</td>
                                    <td className="px-6 py-4">{loan.loanRatePresentage.toFixed(2)}%</td>
                                    <td className="px-6 py-4">{loan.loanDuration}</td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-white hover:underline" style={{ marginRight: '10px' }} onClick={() => handleEdit(loan.id, loan)}>Edit</a>
                                        <a href="#" className="font-medium text-white hover:underline" onClick={() => handleRemove(loan.id)}>Remove</a>
                                    </td>
                                </tr>


                            ))}

                            <tr className="bg-blue-800 text-white">
                                <td className="px-20 py-2 text-right font-bold" colSpan="4">Sub Total (Rs.) :</td>
                                <td className="px-6  font-bold">Rs. {totalLoanAmount.toFixed(2)}</td>
                                <td className="px-6  font-bold">Rs. {totalToBePaid.toFixed(2)}</td>
                                <td className="px-6  font-bold"></td>
                                <td className="px-6  font-bold"></td>
                                <td className="px-6  font-bold"></td>


                            </tr>
                            <tr className="bg-blue-800 text-white">
                                <td className="px-20 pb-3 text-right font-bold" colSpan="4">Total (Rs.) :</td>
                                <td className="px-6 font-bold">Rs. {totalLoanAmount.toFixed(4)}</td>
                                <td className="px-6 font-bold">Rs. {totalToBePaid.toFixed(4)}</td>
                                <td className="px-6 font-bold"></td>
                                <td className="px-6  font-bold"></td>
                                <td className="px-6  font-bold"></td>


                            </tr>
                        </tbody>
                    </table>
                </div>

                <nav className="flex items-center justify-between pt-2">
                    <span className="pl-10 text-sm font-normal text-gray-500">
                        Showing <span className="font-semibold text-gray-900">
                            {indexOfFirstRow + 1}-{indexOfLastRow > filteredLoans.length ? filteredLoans.length : indexOfLastRow}
                        </span> of <span className="font-semibold text-gray-900">{filteredLoans.length}</span>
                    </span>
                    <ul className="pr-10 inline-flex -space-x-px text-sm">
                        <li>
                            <button onClick={handlePrevPage} className="px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100" disabled={currentPage === 1}>
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button onClick={() => setCurrentPage(index + 1)} className={`px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100`}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button onClick={handleNextPage} className="px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100" disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>

            </div>
        </motion.div>
    );
}

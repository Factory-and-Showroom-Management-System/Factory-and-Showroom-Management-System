import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { IoIosAddCircle } from "react-icons/io";
import { Button } from "flowbite-react";
import { TiArrowBackOutline } from "react-icons/ti";
import { TbHandClick } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import RoleOTIncomeCard001 from '../Addition/Cards/RoleOTIncomeCard001';
import AddRolecomp from '../Addition/componets/AddRolecomp';
import EdditRolecomp from '../Addition/componets/EdditRolecomp';
import RemoveRolecomp from '../Addition/componets/RemoveRolecomp';



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

export default function RoleOTIncome() {
    const [roleOTIncomes, setRoleOTIncomes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentDateTime, setCurrentDateTime] = useState('');

    const [addrolecomponet, setAddrolecomponet] = useState(false);
    const [editrolecomponet, setEditrolecomponet] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);

    const [handleRemovecomponet, setHandlexRemove] = useState(false);
    const [idToRemove, setIdToRemove] = useState(null);

    const navigate = useNavigate();


    const handleMonthOT = () => {
        navigate('/admin?tab=adminsMonthOT');

    }
    //dashboard
    const handleDashboard = () => {
        navigate('/admin?tab=adminsalarydashboard');
    }



    
    const handleMonthCount = async (event) => {
        //Fetch the data from the API  run to post: http://localhost:3000/salary/addmonthattempcount
        const response = await axios.post('http://localhost:3000/salary/addmonthattempcount', {
        });
        console.log(response);
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
        fetchRoleOTIncomes();
        handleMonthCount();
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

    const fetchRoleOTIncomes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/salary/showroleotincome');
            setRoleOTIncomes(response.data);
        } catch (error) {
            console.error('Failed to fetch role overtime incomes:', error);
        }
    };


    const filteredRoleOTIncomes = searchTerm
        ? roleOTIncomes.filter(income =>
            income.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            income.id.toString().includes(searchTerm)
        )
        : roleOTIncomes;

    const totalIncome = filteredRoleOTIncomes.reduce((acc, curr) => acc + curr.timeIncome, 0);

    // Calculate the indices of the first and last rows on the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    // Slice the data to get only the rows for the current page
    const currentRows = filteredRoleOTIncomes.slice(indexOfFirstRow, indexOfLastRow);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredRoleOTIncomes.length / rowsPerPage);

    const handlePrevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    const handleNextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);


    const handleAddRole = () => {
        fetchRoleOTIncomes();
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

        setAddrolecomponet(true);
    }

    const hadelonClose = () => {
        fetchRoleOTIncomes();
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

        setAddrolecomponet(false);
    }

    const hadelEdit = (id) => {
        fetchRoleOTIncomes();
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


        setIdToEdit(id);
        setEditrolecomponet(true);
    }

    const hadelEditonClose = () => {
        fetchRoleOTIncomes();
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


        setEditrolecomponet(false);
    }

    const handlexRemove = (id) => {
        fetchRoleOTIncomes();
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


        setIdToRemove(id);
        setHandlexRemove(true);
    }

    const hadelRemoveClose = () => {
        fetchRoleOTIncomes();
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


        setHandlexRemove(false);
    }






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
                            <RoleOTIncomeCard001 />
                        </div>

                    </div>
                </div>

                <div className='p-5'>

                    <h1 className="text-3xl text-green-700 pl-1 pt-2">Role OT Income </h1>

                    <div className='mb-2 mt-5 flex items-center'>

                        <Button onClick={handleAddRole} className='bg-green-600'>
                            <IoIosAddCircle className="mr-2 h-5 w-5 " />
                            Add Role Income
                        </Button>

                        <div className="relative ml-4">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>

                            <div className='flex'>
                                <input
                                    type="text"
                                    className="w-80 h-10 pl-10 pr-3 py-2 border border-blue-400 rounded-lg text-blue-500 focus:ring-blue-500 "
                                    placeholder="Search by Role or ID"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />

                                <Button.Group outline className='ml-2'>
                                    <Button color="gray" onClick={handleMonthOT} >
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
                    </div>

                    <div className="relative overflow-x-auto sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-white uppercase bg-green-600">
                                <tr>
                                    <th scope="col" className="px-6 py-7">ID</th>
                                    <th scope="col" className="px-6 py-3">Role</th>
                                    <th scope="col" className="px-6 py-3">Overtime Income</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((income) => (
                                    <tr key={income.id} className="bg-[#cdf8da] text-black border-b border-[#4bf885] hover:bg-[#a1f0c6]">
                                        <td className="px-6 py-4">{income.id}</td>
                                        <td className="px-6 py-4">{income.role}</td>
                                        <td className="px-6 py-4">Rs. {income.timeIncome}</td>
                                        <td className="px-6 py-4">
                                            <a href="#" className="font-medium text-white hover:underline" style={{ marginRight: '10px' }} onClick={() => hadelEdit(income.id, income.role, income.timeIncome)}>Edit</a>
                                            <a href="#" className="font-medium text-white hover:underline" onClick={() => handlexRemove(income.id)}>Remove</a>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-green-800 text-white">
                                    <td className="px-20 py-2 text-right font-bold" colSpan="2">Sub Total (Rs.) :</td>
                                    <td className="px-6 font-bold" colSpan="2">Rs. {totalIncome.toFixed(2)}</td>

                                </tr>
                                <tr className="bg-green-800 text-white">
                                    <td className="px-20 text-right font-bold" colSpan="2">Total (Rs.) :</td>
                                    <td className="px-6 py-2 font-bold" colSpan="2">Rs. {totalIncome.toFixed(4)}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <nav className="flex items-center justify-between pt-2" aria-label="Table navigation">
                    <span className="pl-10 text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing <span className="font-semibold text-gray-900 dark:text-black">{indexOfFirstRow + 1}-{indexOfLastRow > filteredRoleOTIncomes.length ? filteredRoleOTIncomes.length : indexOfLastRow}</span> of <span className="font-semibold text-gray-900 dark:text-black">{filteredRoleOTIncomes.length}</span>
                    </span>

                    <ul className="pr-10 inline-flex -space-x-px rtl:space-x-reverse text-sm h-10">
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
            {addrolecomponet && <AddRolecomp onClose={hadelonClose} />}
            {editrolecomponet && idToEdit && <EdditRolecomp onClose={hadelEditonClose} id={idToEdit} />}
            {handleRemovecomponet && <RemoveRolecomp id={idToRemove} onClose={hadelRemoveClose} />}

        </motion.div>
    );
}

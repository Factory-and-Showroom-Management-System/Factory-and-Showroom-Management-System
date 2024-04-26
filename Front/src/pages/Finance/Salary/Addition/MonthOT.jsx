import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalOTCard002 from './Cards/TotalOTCard002';
import { TiArrowBackOutline } from "react-icons/ti";
import { TbHandClick } from "react-icons/tb";
import { Button } from "flowbite-react";
import { useNavigate } from 'react-router-dom'


export default function MonthOT() {
    const [monthOTs, setMonthOTs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleDashboard = () => {
        navigate('/finance?tab=salarydash');
    };

    const handleAddition = () => {
        navigate('/finance?tab=additiondash');
    };

    const handleRoleOTIncome = () => {
        navigate('/finance?tab=roleotincome');
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
            setCurrentDateTime(now.toLocaleString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
            }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await fetchMonthOTs();
        };
        fetchData();
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

    const fetchMonthOTs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/salary/showmonthot');
            setMonthOTs(response.data);
        } catch (error) {
            console.error('Failed to fetch MonthOT:', error);
        }
    };

    const filteredMonthOTs = searchTerm
        ? monthOTs.filter(item =>
            item.userId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : monthOTs;

    const totalExtraTimeCount = filteredMonthOTs.reduce((total, item) => total + item.extraTimeCount, 0);
    const totalIncome = filteredMonthOTs.reduce((total, item) => total + item.tIncome, 0);
    const totalOT = filteredMonthOTs.reduce((total, item) => total + item.totalOT, 0);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredMonthOTs.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredMonthOTs.length / rowsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    };

    return (
        <div className="w-full ">
            <div className="relative overflow-x-auto sm:rounded-lg">

                <div className='w-full'>
                    <div className='flex gap-4 '>

                        <div className='p-4 mt-3'>
                            <TotalOTCard002 />
                        </div>

                    </div>
                </div>

                <div className='p-5'>


                    <h1 className="text-3xl text-blue-500  pt-2">Month OT Overview </h1>
                    <div className="pt-2 pb-2 bg-white">
                        <div className="relative ">

                            <div className='flex'>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-80 h-10 pl-10 pr-3 py-2 border border-blue-400 rounded-lg focus:ring-blue-500 focus:border-red-500"
                                    placeholder="Search by User ID or Name"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />

                                <Button.Group outline className='ml-2'>
                                    <Button color="gray" onClick={handleAddition} >
                                        <TiArrowBackOutline className="mr-3 h-4 w-4 mt-0.5" />
                                        Back
                                    </Button>

                                    <Button color="gray" onClick={handleRoleOTIncome}>
                                        <TbHandClick className="mr-3 h-4 w-4 mt-1" />
                                        Role OT Income
                                    </Button>


                                    <Button color="gray" onClick={handleDashboard}>
                                        <TiArrowBackOutline className="mr-3 h-4 w-4 mt-0.5" />
                                        Dashboard
                                    </Button>



                                </Button.Group>

                            </div>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-900 dark:text-white">
                        <thead className="text-xs text-white uppercase bg-blue-600">
                            <tr>
                                <th scope="col" className="px-6 py-7">ID</th>
                                <th scope="col" className="px-6 py-3">User ID</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Extra Time Count</th>
                                <th scope="col" className="px-6 py-3">Total Income</th>
                                <th scope="col" className="px-6 py-3">Total OT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((item) => (
                                <tr key={item.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                    <td className="px-6 py-4">{item.id}</td>
                                    <td className="px-6 py-4">{item.userId}</td>
                                    <td className="px-6 py-4">{item.name}</td>
                                    <td className="px-6 py-4">{item.extraTimeCount}</td>
                                    <td className="px-6 py-4">Rs. {item.tIncome.toFixed(2)}</td>
                                    <td className="px-6 py-4">Rs. {item.totalOT.toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr className="bg-blue-800 text-white">
                                <td className="px-20 py-2 text-right font-bold" colSpan="3">Sub Total (Rs.):</td>
                                <td className="px-6 font-bold">{totalExtraTimeCount}</td>
                                <td className="px-6 font-bold">Rs. {totalIncome.toFixed(2)}</td>
                                <td className="px-6 font-bold">Rs. {totalOT.toFixed(2)}</td>
                            </tr>
                            <tr className="bg-blue-800 text-white">
                                <td className="px-20 py-2 text-right font-bold" colSpan="3">Total (Rs.):</td>
                                <td className="px-6 font-bold" colSpan="3">Rs. {totalOT.toFixed(4)}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <nav className="flex items-center justify-between pt-2">
                    <span className="pl-10 text-sm font-normal text-gray-500">
                        Showing <span className="font-semibold text-gray-900">{indexOfFirstRow + 1}-{indexOfLastRow > filteredMonthOTs.length ? filteredMonthOTs.length : indexOfLastRow}</span> of <span className="font-semibold text-gray-900">{filteredMonthOTs.length}</span>
                    </span>
                    <ul className="pr-10 inline-flex -space-x-px text-sm">
                        <li>
                            <button onClick={handlePrevPage} className="px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100" disabled={currentPage === 1}>
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button onClick={() => setCurrentPage(index + 1)} className={`px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}>
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
        </div >
    );
}

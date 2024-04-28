import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Addition() {
    const [addition, setAddition] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [searchTerm, setSearchTerm] = useState('');



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
        const fetchAdditions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/salary/showadditions');
                setAddition(response.data);
            } catch (error) {
                console.error('Failed to fetch additions:', error);
            }
        };
        fetchAdditions();
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

    const filteredAddition = searchTerm
        ? addition.filter(item =>
            item.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : addition;

    const totalOT = filteredAddition.reduce((acc, curr) => acc + curr.totalOT, 0);
    const totalAllowance = filteredAddition.reduce((acc, curr) => acc + curr.totalAllowance, 0);
    const totalAddition = filteredAddition.reduce((acc, curr) => acc + curr.totalAddition, 0);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredAddition.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredAddition.length / rowsPerPage);

    const handlePrevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    const handleNextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);

    return (

        <div className="shadow-lg p-20 bg-white rounded-lg">
            <div className="relative overflow-x-auto  sm:rounded-lm">
                <h1 className="text-3xl text-blue-500 pl-2 pt-2">Addition Table: {currentDateTime}</h1>

                <div className="pb-2 pt-2 pl-2 bg-white">
                    <div className="relative mt-5">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-80 h-10 pl-10 pr-3 py-2 text-ml border border-blue-400 rounded-lg text-blue-500 focus:ring-blue-500 focus:border-red-500"
                            placeholder="Search by User ID or Name"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                    <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400">
                        <tr>
                            <th scope="col" className="px-6 py-7">ID</th>
                            <th scope="col" className="px-6 py-3">User ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Total OT</th>
                            <th scope="col" className="px-6 py-3">Total Allowance</th>
                            <th scope="col" className="px-6 py-3">Total Addition</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((item) => (
                            <tr key={item.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-6 py-4">{item.id}</td>
                                <td className="px-6 py-4">{item.userId}</td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">Rs. {item.totalOT}</td>
                                <td className="px-6 py-4">Rs. {item.totalAllowance}</td>
                                <td className="px-6 py-4">Rs. {item.totalAddition}</td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-white hover:underline" style={{ marginRight: '10px' }}>Edit</a>
                                    <a href="#" className="font-medium text-white hover:underline">Remove</a>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-blue-800 text-white">
                            <td className="px-20 py-2 text-right font-bold" colSpan="3">Sub Total (Rs.) :</td>
                            <td className="px-6  font-bold">Rs. {totalOT.toFixed(2)}</td>
                            <td className="px-6  font-bold">Rs. {totalAllowance.toFixed(2)}</td>
                            <td className="px-6  font-bold">Rs. {totalAddition.toFixed(2)}</td>
                            <td className="px-6  font-bold"></td>
                        </tr>
                        <tr className="bg-blue-800 text-white ">
                            <td className="px-20 py-2 text-right font-bold " colSpan="3">Total (Rs.) :</td>
                            <td className="px-6 font-bold">Rs. {totalAddition.toFixed(4)}</td>
                            <td className="px-6 font-bold"></td>
                            <td className="px-6 font-bold"></td>
                            <td className="px-6 font-bold"></td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-2 " aria-label="Table navigation">
                <span className="   pl-10 text-mm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto ">
                    Showing <span className="font-semibold text-gray-900 dark:text-black ">{indexOfFirstRow + 1}-{indexOfLastRow > addition.length ? addition.length : indexOfLastRow}</span> of <span className="font-semibold text-gray-900 dark:text-black">{addition.length}</span>
                </span>
                <ul className="pr-10 inline-flex -space-x-px rtl:space-x-reverse text-ml h-10">
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
    );
}

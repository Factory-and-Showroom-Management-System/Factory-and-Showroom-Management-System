import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllMonthSalarySheet() {
    const [salarySheets, setSalarySheets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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
            try {
                const response = await axios.get('http://localhost:3000/salary/showallmonthsalarysheet');
                setSalarySheets(response.data);
            } catch (error) {
                console.error('Failed to fetch Month Salary Sheets:', error);
            }
        };
        fetchData();
    }, []);

    const filteredSalarySheets = salarySheets.filter(sheet =>
        sheet.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sheet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const basicSalary = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allBasicSalary, 0);
    const baValue = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allBaValue, 0);
    const totalEarning = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allTotalEarning, 0);
    const monthLoan = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allMonthLoan, 0);
    const epf8 = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allEpf8, 0);
    const totalDeduction = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allTotalDeduction, 0);
    const totalAllowance = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allTotalAllowance, 0);
    const totalOT = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allTotalOT, 0);
    const totalAddition = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allTotalAddition, 0);
    const netTotal = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allNetTotal, 0);
    const epf12 = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allEpf12, 0);
    const etf3 = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allEtf3, 0);
    const totaNetPay = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.allTotaNetPay, 0);





    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredSalarySheets.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredSalarySheets.length / rowsPerPage);

    const formatNumber = (value) => value != null ? value.toFixed(2) : 'N/A';

    const handlePrevPage = () => {
        setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    };

    const handleNextPage = () => {
        setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);
    };

    return (
        <div className="shadow-lg p-10 bg-white rounded-lg">
            <div className="relative overflow-x-auto sm:rounded-lg">
                <h1 className="text-3xl text-blue-500 pl-2 pt-2">All Month Salary Sheets: {currentDateTime}</h1>
                <div className="pb-2 pt-2 pl-2 bg-white">
                    <div className="relative ml-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-80 h-10 pl-10 pr-3 py-2 border border-blue-400 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search by User ID or Name"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-900">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="px-4 py-7">ID</th>
                            <th scope="col" className="px-4 py-3">Date</th>
                            <th scope="col" className="px-8 py-3">User ID</th>
                            <th scope="col" className="px-11 py-3">Name</th>
                            <th scope="col" className="px-9 py-3">Role</th>
                            <th scope="col" className="px-10 py-3">Basic Salary</th>
                            <th scope="col" className="px-10 py-3">BA Value</th>
                            <th scope="col" className="px-10 py-3">Month Loan</th>
                            <th scope="col" className="px-10 py-3">EPF 8%</th>
                            <th scope="col" className="px-10 py-3">Total Deduction</th>
                            <th scope="col" className="px-10 py-3">Total Allowance</th>
                            <th scope="col" className="px-10 py-3">Total OT</th>
                            <th scope="col" className="px-10 py-3">Total Addition</th>
                            <th scope="col" className="px-10 py-3">Net Total</th>
                            <th scope="col" className="px-10 py-3">EPF 12%</th>
                            <th scope="col" className="px-10 py-3">ETF 3%</th>
                            <th scope="col" className="px-10 py-3">Total Net Pay</th>
                            <th scope="col" className="px-10 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((sheet) => (
                            <tr key={sheet.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-4 py-3">{sheet.id}</td>
                                <td className="px-4 py-1">{new Date(sheet.monthCurrentDate).toLocaleDateString()}</td>
                                <td className="px-8 py-1">{sheet.userId}</td>
                                <td className="px-5 py-1">{sheet.name}</td>
                                <td className="px-10 py-1">{sheet.role}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allBasicSalary)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allBaValue)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allMonthLoan)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allEpf8)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allTotalDeduction)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allTotalAllowance)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allTotalOT)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allTotalAddition)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allNetTotal)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allEpf12)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allEtf3)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.allTotaNetPay)}</td>
                                <td className="px-10 py-1">
                                    <a href="#" className="font-medium text-white hover:underline">Edit</a>
                                    <a href="#" className="font-medium text-white hover:underline" style={{ marginLeft: '10px' }}>Remove</a>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-blue-800 text-white font-bold">
                        <td className="px-20 py-7 text-right font-bold" colSpan="5">Sub Total ( Rs. ) :</td>
                            <td className="px-10 ">Rs.{formatNumber(basicSalary)}</td>
                            <td className="px-10 ">Rs.{formatNumber(baValue)}</td>
                            <td className="px-10 ">Rs.{formatNumber(monthLoan)}</td>
                            <td className="px-10 ">Rs.{formatNumber(epf8)}</td>
                            <td className="px-10 ">Rs.{formatNumber(totalDeduction)}</td>
                            <td className="px-10 ">Rs.{formatNumber(totalAllowance)}</td>
                            <td className="px-10 ">Rs.{formatNumber(totalOT)}</td>
                            <td className="px-10 ">Rs.{formatNumber(totalAddition)}</td>
                            <td className="px-10 ">Rs.{formatNumber(netTotal)}</td>
                            <td className="px-10 ">Rs.{formatNumber(epf12)}</td>
                            <td className="px-10 ">Rs.{formatNumber(etf3)}</td>
                            <td className="px-10 ">Rs.{formatNumber(totaNetPay)}</td>
                            <td className="px-10 py-7"></td>

                        </tr>

                    </tbody>
                </table>
            </div>
            <nav className="flex items-center justify-between pt-2">
                <span className="pl-10 text-sm font-normal text-gray-500">
                    Showing <span className="font-semibold text-gray-900">
                        {indexOfFirstRow + 1}-{indexOfLastRow > filteredSalarySheets.length ? filteredSalarySheets.length : indexOfLastRow}
                    </span> of <span className="font-semibold text-gray-900">{filteredSalarySheets.length}</span>
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
    );
}

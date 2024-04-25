import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SubTotalMonthSalarySheet() {
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
                const response = await axios.get('http://localhost:3000/salary/showsubtotalmonthsalarysheet');
                setSalarySheets(response.data);
            } catch (error) {
                console.error('Failed to fetch Sub Total Month Salary Sheets:', error);
            }
        };
        fetchData();
    }, []);

    const filteredSalarySheets = searchTerm
        ? salarySheets.filter(sheet =>
            (sheet.name && sheet.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (sheet.currentDate && new Date(sheet.currentDate).toLocaleDateString('en-US').includes(searchTerm))
        )
        : salarySheets;


    const totalbasicSalary = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.totalbasicSalary, 0);
    const totalbaValue = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.totalbaValue, 0);
    const fulltotalEarning = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.fulltotalEarning, 0);
    const totalmonthLoan = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.totalmonthLoan, 0);
    const totalepf8 = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.totalepf8, 0);
    const fulltotalDeduction = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.fulltotalDeduction, 0);
    const fulltotalAllowance = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.fulltotalAllowance, 0);
    const fulltotalOT = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.fulltotalOT, 0);
    const fulltotalAddition = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.fulltotalAddition, 0);
    const fullnetTotal = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.fullnetTotal, 0);
    const totalepf12 = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.totalepf12, 0);
    const totaletf3 = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.totaletf3, 0);
    const fulltotalNetPay = filteredSalarySheets.reduce((acc, sheet) => acc + sheet.fulltotalNetPay, 0);






    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredSalarySheets.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredSalarySheets.length / rowsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    };

    function formatNumber(value) {
        return value != null ? value.toFixed(2) : 'N/A';
    }

    return (
        <div className="shadow-lg p-10 bg-white rounded-lg">
            <div className="relative overflow-x-auto sm:rounded-lg">
                <h1 className="text-3xl text-blue-500 pl-2 pt-2">Sub Total Month Salary Sheet : {currentDateTime}</h1>
                <div className="pb-2 pt-2 pl-2 bg-white">
                    <div className="relative ml-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-80 h-10 pl-10 pr-3 py-2 border border-blue-400 rounded-lg focus:ring-blue-500 focus:border-red-500"
                            placeholder="Search by Date (day/month/year)"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-900 dark:text-white">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="px-4 py-7">ID</th>
                            <th scope="col" className="px-4 py-3">Current Date</th>
                            <th scope="col" className="px-10 py-3">Total Basic Salary</th>
                            <th scope="col" className="px-10 py-3">Total BA Value</th>
                            <th scope="col" className="px-10 py-3">Full Total Earning</th>
                            <th scope="col" className="px-10 py-3">Total Month Loan</th>
                            <th scope="col" className="px-10 py-3">Total EPF 8%</th>
                            <th scope="col" className="px-10 py-3">Full Total Deduction</th>
                            <th scope="col" className="px-10 py-3">Full Total Allowance</th>
                            <th scope="col" className="px-10 py-3">Full Total OT</th>
                            <th scope="col" className="px-10 py-3">Full Total Addition</th>
                            <th scope="col" className="px-10 py-3">Full Net Total</th>
                            <th scope="col" className="px-10 py-3">Total EPF 12%</th>
                            <th scope="col" className="px-10 py-3">Total ETF 3%</th>
                            <th scope="col" className="px-10 py-3">Full Total Net Pay</th>
                            <th scope="col" className="px-10 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((sheet) => (
                            <tr key={sheet.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-4 py-3">{sheet.id}</td>
                                <td className="px-4 py-1">{sheet.currentDate ? new Date(sheet.currentDate).toLocaleDateString() : 'N/A'}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.totalbasicSalary)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.totalbaValue)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.fulltotalEarning)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.totalmonthLoan)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.totalepf8)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.fulltotalDeduction)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.fulltotalAllowance)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.fulltotalOT)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.fulltotalAddition)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.fullnetTotal)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.totalepf12)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.totaletf3)}</td>
                                <td className="px-10 py-1">Rs.{formatNumber(sheet.fulltotalNetPay)}</td>
                                <td className="px-10 py-1">
                                    <a href="#" className="font-medium text-white hover:underline">Edit</a>
                                    <a href="#" className="font-medium text-white hover:underline" style={{ marginLeft: '10px' }}>Remove</a>
                                </td>
                            </tr>

                        ))}
                        <tr className="bg-blue-800 text-white">
                            <td className="px-20 py-7  text-right font-bold" colSpan="2">Sub(Rs.)</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(totalbasicSalary)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(totalbaValue)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(fulltotalEarning)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(totalmonthLoan)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(totalepf8)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(fulltotalDeduction)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(fulltotalAllowance)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(fulltotalOT)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(fulltotalAddition)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(fullnetTotal)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(totalepf12)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(totaletf3)}</td>
                            <td className="px-10 font-bold">Rs.{formatNumber(fulltotalNetPay)}</td>
                            <td className="px-10 font-bold"></td>
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

//test1
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserMonthLoan() {
    const [loans, setLoans] = useState([]);
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
            await fetchLoans();
        };
        fetchData();
    }, []);

    const fetchLoans = async () => {
        try {
            const response = await axios.get('http://localhost:3000/salary/showusermonthloan');
            setLoans(response.data);
        } catch (error) {
            console.error('Failed to fetch month loans:', error);
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


    const filteredLoans = searchTerm
        ? loans.filter(item =>
            item.userId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : loans;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredLoans.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredLoans.length / rowsPerPage);

    const totalMonthLoan = filteredLoans.reduce((sum, loan) => sum + parseFloat(loan.monthLoan), 0);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    };

    return (
        <div className="shadow-lg p-20 bg-white rounded-lg">
            <div className="relative overflow-x-auto sm:rounded-lg">
                <h1 className="text-3xl text-blue-500 pl-2 pt-2">User Month Loans: {currentDateTime}</h1>
                <div className='mb-2 mt-5 flex items-center'>

                    <div className="relative ml-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
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
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-900 dark:text-white">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="px-6 py-7">ID</th>
                            <th scope="col" className="px-6 py-3">User ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Month Loan (Rs.)</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((item) => (
                            <tr key={item.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-6 py-4">{item.id}</td>
                                <td className="px-6 py-4">{item.userId}</td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{formatDate(item.currentDate)}</td>
                                <td className="px-6 py-4">Rs. {item.monthLoan.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-white hover:underline" style={{ marginRight: '10px' }} onClick={() => handleEdit(loan.id, loan)}>Edit</a>
                                    <a href="#" className="font-medium text-white hover:underline" onClick={() => handleRemove(loan.id)}>Remove</a>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-blue-800 text-white">
                            <td className="px-20 py-2 text-right font-bold" colSpan="4">Sub Total (Rs.):</td>
                            <td className="px-6 font-bold" colSpan="4">Rs. {totalMonthLoan.toFixed(2)}</td>

                        </tr>
                        <tr className="bg-blue-800 text-white">
                            <td className="px-20 py-2 text-right font-bold" colSpan="4">Total (Rs.):</td>
                            <td className="px-6 font-bold" colSpan="2">Rs. {totalMonthLoan.toFixed(2)}</td>

                        </tr>
                    </tbody>
                </table>
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
                                <button onClick={() => setCurrentPage(index + 1)} className={`px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 ${currentPage === index + 1 ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
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
        </div>
    );
}

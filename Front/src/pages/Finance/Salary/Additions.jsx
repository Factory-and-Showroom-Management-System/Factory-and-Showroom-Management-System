import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Additions() {
    const [additions, setAdditions] = useState([]);
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
            await fetchAdditions();
        };
        fetchData();
    }, []);

    const fetchAdditions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/salary/showadditions');
            setAdditions(response.data);
        } catch (error) {
            console.error('Failed to fetch Additions:', error);
        }
    };

    const filteredAdditions = searchTerm
        ? additions.filter(item =>
            item.userId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : additions;

    const totalOT = filteredAdditions.reduce((total, item) => total + item.totalOT, 0);
    const totalAllowance = filteredAdditions.reduce((total, item) => total + item.totalAllowance, 0);
    const totalAddition = filteredAdditions.reduce((total, item) => total + item.totalAddition, 0);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredAdditions.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredAdditions.length / rowsPerPage);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    };

    return (
        <div className="shadow-lg p-20 bg-white rounded-lg">
            <div className="relative overflow-x-auto sm:rounded-lg">
                <h1 className="text-3xl text-blue-500 pl-2 pt-2">Additions Overview : {currentDateTime}</h1>
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
                            <th scope="col" className="px-6 py-3">Total OT (Rs.)</th>
                            <th scope="col" className="px-6 py-3">Total Allowance (Rs.)</th>
                            <th scope="col" className="px-6 py-3">Total Addition (Rs.)</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((item) => (
                            <tr key={item.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-6 py-4">{item.id}</td>
                                <td className="px-6 py-4">{item.userId}</td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">Rs. {item.totalOT.toFixed(2)}</td>
                                <td className="px-6 py-4">Rs. {item.totalAllowance.toFixed(2)}</td>
                                <td className="px-6 py-4">Rs. {item.totalAddition.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-white hover:underline">Edit</a>
                                    <a href="#" className="font-medium text-white hover:underline" style={{ marginLeft: '10px' }}>Remove</a>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-blue-800 text-white">
                            <td className="px-20 py-2 text-right font-bold" colSpan="3">Sub Total (Rs.):</td>
                            <td className="px-6 font-bold" >Rs. {totalOT.toFixed(2)}</td>
                            <td className="px-6 font-bold" >Rs. {totalAllowance.toFixed(2)}</td>
                            <td className="px-6 font-bold" colSpan="2">Rs. {totalAddition.toFixed(2)}</td>

                        </tr>
                        <tr className="bg-blue-800 text-white">
                            <td className="px-20 py-2 text-right font-bold" colSpan="3">Total (Rs.):</td>
                            <td className="px-6 font-bold" colSpan="4">Rs. {totalAddition.toFixed(4)}</td>

                        </tr>
                    </tbody>
                </table>
                <nav className="flex items-center justify-between pt-2">
                    <span className="pl-10 text-sm font-normal text-gray-500">
                        Showing <span className="font-semibold text-gray-900">
                            {indexOfFirstRow + 1}-{indexOfLastRow > filteredAdditions.length ? filteredAdditions.length : indexOfLastRow}
                        </span> of <span className="font-semibold text-gray-900">{filteredAdditions.length}</span>
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

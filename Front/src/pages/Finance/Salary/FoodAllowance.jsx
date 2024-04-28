import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function FoodAllowance() {
    const [allowances, setAllowances] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');


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
        fetchAllowances();
    }, []);

    const fetchAllowances = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:3000/salary/showfoodallowance');
            setAllowances(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch allowances:', error);
            setError('Failed to fetch allowances');
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Add New Food Allowance',
            html: `
                <input id="swal-input1" class="swal2-input" type="date" placeholder="Allowance Date">
                <input id="swal-input2" class="swal2-input" type="number" placeholder="Allowance Amount">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Add',

            preConfirm: () => {
                return [

                    document.getElementById('swal-input1').value, // Loan Date
                    parseFloat(document.getElementById('swal-input2').value), // Loan Amount
                ]
            }
        });
        if (formValues) {
            try {
                await axios.post(`http://localhost:3000/salary/addfoodallowance`, {
                    allowanceDate: formValues[0],
                    allowance: parseFloat(formValues[1])
                });
                MySwal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: 'New food allowance has been added.',
                });
                fetchAllowances();
            } catch (error) {
                console.error('Failed to add allowance:', error.response ? error.response.data : error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to add!',
                    text: 'Adding new allowance failed: ' + (error.response ? error.response.data.message : error.message),
                });
            }
        }
    };

    const handleEdit = async (id, currentData) => {
        const { value: formValues } = await MySwal.fire({
            title: 'Edit Food Allowance',
            html: `
                <input id="swal-input1" class="swal2-input" type="date" value="${currentData.allowanceDate.slice(0, 10)}">
                <input id="swal-input2" class="swal2-input" type="number" value="${currentData.allowance}">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Add',

            preConfirm: () => {
                return [

                    document.getElementById('swal-input1').value, // Loan Date
                    parseFloat(document.getElementById('swal-input2').value), // Loan Amount
                ]
            }
        });
        if (formValues) {
            try {
                await axios.put(`http://localhost:3000/salary/updatefoodallowance/${id}`, {
                    allowanceDate: formValues[0],
                    allowance: parseFloat(formValues[1])
                });
                MySwal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Food allowance has been successfully updated.',
                });
                fetchAllowances();
            } catch (error) {
                console.error('Failed to update allowance:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to update!',
                    text: 'Updating allowance failed: ' + (error.response ? error.response.data.message || error.response.data : error.message),
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
                await axios.delete(`http://localhost:3000/salary/deletefoodallowance/${id}`);
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'Food allowance has been deleted.',
                    icon: 'success',
                });
                fetchAllowances();
            } catch (error) {
                console.error('Failed to delete allowance:', error);
                MySwal.fire({
                    title: 'Failed!',
                    text: 'Failed to delete allowance.',
                    icon: 'error',
                });
            }
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

    const filteredAllowances = searchTerm
        ? allowances.filter(allowance =>
            (allowance.id && allowance.id.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : allowances;

    const totalAllowance = filteredAllowances.reduce((total, allowance) => total + allowance.allowance, 0);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredAllowances.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredAllowances.length / rowsPerPage);

    const handlePrevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    const handleNextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);

    return (
        <div className="shadow-lg p-10 bg-white rounded-lg">
            <div className="relative overflow-x-auto">
                <h1 className="text-3xl text-blue-500 pl-1 pt-2">Food Allowance Table: {currentDateTime}</h1>

                <div className='mb-2 mt-5 flex items-center'>
                    <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add Loan
                    </button>
                    <div className="relative ml-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="w-80 h-10 pl-10 pr-3 py-2 border border-blue-400 rounded-lg text-blue-500"
                            placeholder="Search by ID"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="px-6 py-7">ID</th>
                            <th scope="col" className="px-6 py-3">Allowance Date</th>
                            <th scope="col" className="px-6 py-3">Allowance Amount</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((allowance) => (
                            <tr key={allowance.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-6 py-4">{allowance.id}</td>
                                <td className="px-6 py-4">{formatDate(allowance.allowanceDate)}</td>
                                <td className="px-6 py-4">Rs. {allowance.allowance.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-white hover:underline" style={{ marginRight: '10px' }} onClick={() => handleEdit(allowance.id, allowance)}>Edit</a>
                                    <a href="#" className="font-medium text-white hover:underline" onClick={() => handleRemove(allowance.id)}>Remove</a>
                                </td>
                            </tr>
                        ))}

<tr className="bg-blue-800 text-white">
                            <td className="px-20 py-2 text-right font-bold" colSpan="2">Sub Total (Rs.) :</td>
                            <td className="px-6  font-bold" colSpan="2">Rs. {totalAllowance.toFixed(2)}</td>

                        </tr>
                        <tr className="bg-blue-800 text-white">
                            <td className="px-20 pb-3 text-right font-bold" colSpan="2">Total (Rs.) :</td>
                            <td className="px-6 font-bold" colSpan="2">Rs. {totalAllowance.toFixed(4)}</td>

  


                        </tr>
                    </tbody>
                </table>

                <nav className="flex items-center justify-between pt-2">
                    <span className="pl-10 text-sm font-normal text-gray-500">
                        Showing <span className="font-semibold text-gray-900">{indexOfFirstRow + 1}-{indexOfLastRow > filteredAllowances.length ? filteredAllowances.length : indexOfLastRow}</span> of <span className="font-semibold text-gray-900">{filteredAllowances.length}</span>
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
        </div>
    );
}

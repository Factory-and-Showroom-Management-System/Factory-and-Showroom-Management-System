import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

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

    const fetchCustomers = async () => {
        try {
            const response = await fetch('http://localhost:3000/customers/view');
            if (!response.ok) {
                throw new Error('Failed to fetch customers');
            }
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        }
    };

    const handleAdd = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Add New Customer',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Customer ID" required>
                <input id="swal-input2" class="swal2-input" placeholder="Name" required>
                <input id="swal-input3" class="swal2-input" placeholder="Address" required>
                <input id="swal-input4" class="swal2-input" placeholder="Phone (10 digits)" required pattern="[0-9]{10}">
                <input id="swal-input5" class="swal2-input" placeholder="Number Of" type="number" required>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Add',
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value,
                    document.getElementById('swal-input4').value,
                    document.getElementById('swal-input5').value
                ]
            }
        });

        if (formValues) {
            try {
                await fetch('http://localhost:3000/customers/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        customerId: formValues[0],
                        name: formValues[1],
                        address: formValues[2],
                        phone: formValues[3],
                        numberOf: parseFloat(formValues[4])
                    })
                });
                MySwal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: 'New customer has been added.',
                });
                fetchCustomers();
            } catch (error) {
                console.error('Failed to add customer:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to add!',
                    text: 'Adding new customer failed.',
                });
            }
        }
    };

    const handleEdit = async (id, currentData) => {
        const { value: formValues } = await MySwal.fire({
            title: 'Edit Customer',
            html: `
                <input id="swal-input1" class="swal2-input" value="${currentData.customerId}" required>
                <input id="swal-input2" class="swal2-input" value="${currentData.name}" required>
                <input id="swal-input3" class="swal2-input" value="${currentData.address}" required>
                <input id="swal-input4" class="swal2-input" value="${currentData.phone}" required pattern="[0-9]{10}">
                <input id="swal-input5" class="swal2-input" value="${currentData.numberOf}" type="number" required>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save Changes',
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value,
                    document.getElementById('swal-input4').value,
                    document.getElementById('swal-input5').value
                ]
            }
        });

        if (formValues) {
            try {
                await fetch(`http://localhost:3000/customers/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        customerId: formValues[0],
                        name: formValues[1],
                        address: formValues[2],
                        phone: formValues[3],
                        numberOf: parseFloat(formValues[4])
                    })
                });
                MySwal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Customer has been updated.',
                });
                fetchCustomers();
            } catch (error) {
                console.error('Failed to update customer:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to update!',
                    text: 'Customer update failed.',
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
                await fetch(`http://localhost:3000/customers/delete/${id}`, {
                    method: 'DELETE'
                });
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'Customer has been deleted.',
                    icon: 'success',
                });
                fetchCustomers();
            } catch (error) {
                console.error('Failed to delete customer:', error);
                MySwal.fire({
                    title: 'Failed!',
                    text: 'Failed to delete customer.',
                    icon: 'error',
                });
            }
        }
    };

    const filteredCustomers = searchTerm
        ? customers.filter(customer =>
            customer.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : customers;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

    const handlePrevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    const handleNextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);

    return (
        <div className="shadow-lg p-20 bg-white rounded-lg">
            <div className="relative overflow-x-auto l:rounded-lg">
                <h1 className="text-3xl text-blue-500 pl-1 pt-2">Customer Table: {currentDateTime}</h1>

                <div className='mb-2 mt-5 flex items-center'>
                    <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add Customer
                    </button>
                    <div className="relative ml-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="w-80 h-10 pl-10 pr-3 py-2 border border-blue-400 rounded-lg text-blue-500 focus:ring-blue-500 focus:border-red-500"
                            placeholder="Search by Customer ID or Name"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="px-6 py-7">Customer ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">Number Of</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                
<tbody>
<tr>
            <td className="px-6 py-4 font-bold">Total Customers: {filteredCustomers.length}</td>
            <td className="px-6 py-4" colSpan="8"></td>
        </tr>
    {currentRows.map((customer) => (
        <tr key={customer.id} className="bg-blue-500 text-black border-b border-blue-400 hover:bg-blue-400">
            <td className="px-6 py-4">{customer.customerId}</td>
            <td className="px-6 py-4">{customer.name}</td>
            <td className="px-6 py-4">{customer.address}</td>
            <td className="px-6 py-4">{customer.phone}</td>
            <td className="px-6 py-4">{customer.numberOf}</td>
            <td className="px-6 py-4">
                <button className="font-medium text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-3 rounded mr-2" onClick={() => handleEdit(customer.id, customer)}>
                    Edit
                </button>
                <button className="font-medium text-white bg-red-500 hover:bg-red-600 py-1 px-3 rounded" onClick={() => handleRemove(customer.id)}>
                    Remove
                </button>
            </td>
        </tr>
    ))}
</tbody>


                </table>

                <nav className="flex items-center justify-between pt-2" aria-label="Table navigation">
                    <span className="pl-10 text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing <span className="font-semibold text-gray-900 dark:text-black">{indexOfFirstRow + 1}-{indexOfLastRow > filteredCustomers.length ? filteredCustomers.length : indexOfLastRow}</span> of <span className="font-semibold text-gray-900 dark:text-black">{filteredCustomers.length}</span>
                    </span>

                    <ul className="pr-10 inline-flex -space-x-px rtl:space-x-reverse text-sm h-10">
                        <li>
                            <button onClick={handlePrevPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" disabled={currentPage === 1}>
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button onClick={() => setCurrentPage(index + 1)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${currentPage === index + 1 ? 'bg-gray-200' : ''} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button onClick={handleNextPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" disabled={currentPage === totalPages}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    );
}

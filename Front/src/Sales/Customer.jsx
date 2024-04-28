import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/customer/showcustomers');
            setCustomers(response.data.data);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        }
    };

    const handleAdd = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Add New Customer',
            html: `
                <input id="customerId" class="swal2-input" placeholder="Customer ID">
                <input id="name" class="swal2-input" placeholder="Name">
                <input id="address" class="swal2-input" placeholder="Address">
                <input id="phone" class="swal2-input" placeholder="Phone">
                <input id="numberOf" class="swal2-input" type="number" placeholder="Number Of">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Add',
            preConfirm: () => {
                return {
                    customerId: document.getElementById('customerId').value,
                    name: document.getElementById('name').value,
                    address: document.getElementById('address').value,
                    phone: document.getElementById('phone').value,
                    numberOf: document.getElementById('numberOf').value,
                };
            }
        });

        if (formValues) {
            try {
                await axios.post(`http://localhost:3000/customer/addcustomer`, formValues);
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

    const handleEdit = async (id, currentCustomer) => {
        const { value: formValues } = await MySwal.fire({
            title: 'Edit Customer',
            html: `
                <input id="name" class="swal2-input" value="${currentCustomer.name}">
                <input id="address" class="swal2-input" value="${currentCustomer.address}">
                <input id="phone" class="swal2-input" value="${currentCustomer.phone}">
                <input id="numberOf" class="swal2-input" type="number" value="${currentCustomer.numberOf}">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save Changes',
            preConfirm: () => {
                return {
                    name: document.getElementById('name').value,
                    address: document.getElementById('address').value,
                    phone: document.getElementById('phone').value,
                    numberOf: document.getElementById('numberOf').value,
                };
            }
        });

        if (formValues) {
            try {
                await axios.put(`http://localhost:3000/customer/updatecustomer/${currentCustomer.customerId}`, formValues);
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
                await axios.delete(`http://localhost:3000/customer/deletecustomer/${id}`);
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
            customer.customerId.includes(searchTerm) ||
            customer.name.includes(searchTerm) ||
            customer.address.includes(searchTerm) ||
            customer.phone.includes(searchTerm)
        )
        : customers;

    const indexOfLastCustomer = currentPage * rowsPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - rowsPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

    const handlePrevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    const handleNextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);

    return (
        <div className="shadow-lg p-20 bg-white rounded-lg">
            <div className="relative overflow-x-auto l:rounded-lg">
                <h1 className="text-3xl text-blue-500 pl-1 pt-2">Customers Table</h1>

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
                            placeholder="Search by Customer ID, Name, Address, or Phone"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="px-6 py-7">Table ID</th>
                            <th scope="col" className="px-6 py-7">Customer ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
                            <th scope="col" className="px-6 py-3">Number Of Orders</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCustomers.map((customer) => (
                            <tr key={customer.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-6 py-4">{customer.id}</td>
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
                        Showing <span className="font-semibold text-gray-900 dark:text-black">{indexOfFirstCustomer + 1}-{indexOfLastCustomer > filteredCustomers.length ? filteredCustomers.length : indexOfLastCustomer}</span> of <span className="font-semibold text-gray-900 dark:text-black">{filteredCustomers.length}</span>
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
        </div>
    );
}

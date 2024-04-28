import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Order() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentDateTime, setCurrentDateTime] = useState('');

   useEffect(() => {
    const timer = setInterval(() => {
        const now = new Date();
        const dateTimeString = now.toLocaleString('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        setCurrentDateTime(dateTimeString.replace(/\//g, '-'));
    }, 1000);
    return () => clearInterval(timer);
}, []);

    
    
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/order/showorders');
            // Calculate total price for each order and add to orders
            const ordersWithTotalPrice = response.data.data.map(order => ({
                ...order,
                totalPrice: order.quantity * order.unitPrice
            }));
            setOrders(ordersWithTotalPrice);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    const handleAdd = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Add New Order',
            html: `
                <input id="orderId" class="swal2-input" placeholder="Order ID">
                <input id="customerId" class="swal2-input" placeholder="Customer ID">
                <input id="productId" class="swal2-input" placeholder="Product ID">
                <input id="orderDate" class="swal2-input" type="date" placeholder="Order Date">
                <input id="quantity" class="swal2-input" type="number" placeholder="Quantity">
                <input id="unitPrice" class="swal2-input" type="number" placeholder="Unit Price">
                <input id="status" class="swal2-input" placeholder="Status">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Add',
            preConfirm: () => {
                return {
                    orderId: document.getElementById('orderId').value,
                    customerId: document.getElementById('customerId').value,
                    productId: document.getElementById('productId').value,
                    orderDate: document.getElementById('orderDate').value,
                    quantity: document.getElementById('quantity').value,
                    unitPrice: document.getElementById('unitPrice').value,
                    status: document.getElementById('status').value,
                };
            }
        });

        if (formValues) {
            try {
                await axios.post(`http://localhost:3000/order/addorder`, formValues);
                MySwal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: 'New order has been added.',
                });
                fetchOrders();
            } catch (error) {
                console.error('Failed to add order:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to add!',
                    text: 'Adding new order failed.',
                });
            }
        }
    };

    const handleEdit = async (id, currentOrder) => {
        const { value: formValues } = await MySwal.fire({
            title: 'Edit Order',
            html: `
                <input id="customerId" class="swal2-input" value="${currentOrder.customerId}">
                <input id="productId" class="swal2-input" value="${currentOrder.productId}">
                <input id="orderDate" class="swal2-input" type="date" value="${currentOrder.orderDate}">
                <input id="quantity" class="swal2-input" type="number" value="${currentOrder.quantity}">
                <input id="unitPrice" class="swal2-input" type="number" value="${currentOrder.unitPrice}">
                <input id="status" class="swal2-input" value="${currentOrder.status}">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save Changes',
            preConfirm: () => {
                return {
                    customerId: document.getElementById('customerId').value,
                    productId: document.getElementById('productId').value,
                    orderDate: document.getElementById('orderDate').value,
                    quantity: document.getElementById('quantity').value,
                    unitPrice: document.getElementById('unitPrice').value,
                    status: document.getElementById('status').value,
                };
            }
        });
    
        if (formValues) {
            try {
                // Pass the formValues directly as the second argument
                await axios.put(`http://localhost:3000/order/updateorder/${currentOrder.orderId}`, formValues);
                MySwal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Order has been updated.',
                });
                fetchOrders();
            } catch (error) {
                console.error('Failed to update order:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to update!',
                    text: 'Order update failed.',
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
                await axios.delete(`http://localhost:3000/order/deleteorder/${id}`);
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'Order has been deleted.',
                    icon: 'success',
                });
                fetchOrders();
            } catch (error) {
                console.error('Failed to delete order:', error);
                MySwal.fire({
                    title: 'Failed!',
                    text: 'Failed to delete order.',
                    icon: 'error',
                });
            }
        }
    };

    const filteredOrders = searchTerm
        ? orders.filter(order =>
            order.orderId.includes(searchTerm) ||
            order.customerId.includes(searchTerm) ||
            order.productId.includes(searchTerm) ||
            order.status.includes(searchTerm)
        )
        : orders;

    const indexOfLastOrder = currentPage * rowsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

    const handlePrevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    const handleNextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);

    return (
        <div className="shadow-lg p-20 bg-white rounded-lg">
            <div className="relative overflow-x-auto l:rounded-lg">
                <h1 className="text-3xl text-blue-500 pl-1 pt-2">Orders Table: {currentDateTime}</h1>

                <div className='mb-2 mt-5 flex items-center'>
                    <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add Order
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
                            placeholder="Search by Order ID, Customer ID, Product ID, or Status"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="px-6 py-7">Table ID</th>
                            <th scope="col" className="px-6 py-7">Order ID</th>
                            <th scope="col" className="px-6 py-3">Customer ID</th>
                            <th scope="col" className="px-6 py-3">Product ID</th>
                            <th scope="col" className="px-6 py-3">Order Date</th>
                            <th scope="col" className="px-6 py-3">Quantity</th>
                            <th scope="col" className="px-6 py-3">Unit Price</th>
                            <th scope="col" className="px-6 py-3">Total Price</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order) => (
                            <tr key={order.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-6 py-4">{order.id}</td>
                                <td className="px-6 py-4">{order.orderId}</td>
                                <td className="px-6 py-4">{order.customerId}</td>
                                <td className="px-6 py-4">{order.productId}</td>
                                <td className="px-6 py-4">{new Date(order.orderDate).toLocaleString('en-US', {
                                     year: 'numeric', month: '2-digit', day: '2-digit',
                                     hour: '2-digit', minute: '2-digit', second: '2-digit'
                                })}</td>

                                <td className="px-6 py-4">{order.quantity}</td>
                                <td className="px-6 py-4">{order.unitPrice}</td>
                                <td className="px-6 py-4">{order.totalPrice}</td>
                                <td className="px-6 py-4">{order.status}</td>
                                <td className="px-6 py-4">
                                    <button className="font-medium text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-3 rounded mr-2" onClick={() => handleEdit(order.id, order)}>
                                        Edit
                                    </button>
                                    <button className="font-medium text-white bg-red-500 hover:bg-red-600 py-1 px-3 rounded" onClick={() => handleRemove(order.id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <nav className="flex items-center justify-between pt-2" aria-label="Table navigation">
                    <span className="pl-10 text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing <span className="font-semibold text-gray-900 dark:text-black">{indexOfFirstOrder + 1}-{indexOfLastOrder > filteredOrders.length ? filteredOrders.length : indexOfLastOrder}</span> of <span className="font-semibold text-gray-900 dark:text-black">{filteredOrders.length}</span>
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

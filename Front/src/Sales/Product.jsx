import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Product() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/product/showproducts');
            setProducts(response.data.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const handleAdd = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Add New Product',
            html: `
                <input id="productId" class="swal2-input" placeholder="Product ID">
                <input id="p_name" class="swal2-input" placeholder="Product Name">
                <input id="available" class="swal2-input" type="number" placeholder="Available">
                <input id="unitPrice" class="swal2-input" type="number" placeholder="Unit Price">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Add',
            preConfirm: () => {
                return {
                    productId: document.getElementById('productId').value,
                    p_name: document.getElementById('p_name').value,
                    available: document.getElementById('available').value,
                    unitPrice: document.getElementById('unitPrice').value,
                };
            }
        });

        if (formValues) {
            try {
                await axios.post(`http://localhost:3000/product/addproduct`, formValues);
                MySwal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: 'New product has been added.',
                });
                fetchProducts();
            } catch (error) {
                console.error('Failed to add product:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to add!',
                    text: 'Adding new product failed.',
                });
            }
        }
    };

    const handleEdit = async (id, currentProduct) => {
        const { value: formValues } = await MySwal.fire({
            title: 'Edit Product',
            html: `
                <input id="p_name" class="swal2-input" value="${currentProduct.p_name}">
                <input id="available" class="swal2-input" type="number" value="${currentProduct.available}">
                <input id="unitPrice" class="swal2-input" type="number" value="${currentProduct.unitPrice}">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save Changes',
            preConfirm: () => {
                return {
                    p_name: document.getElementById('p_name').value,
                    available: document.getElementById('available').value,
                    unitPrice: document.getElementById('unitPrice').value,
                };
            }
        });
    
        if (formValues) {
            try {
                await axios.put(`http://localhost:3000/product/updateproduct/${id}`, formValues);
                MySwal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Product has been updated.',
                });
                fetchProducts();
            } catch (error) {
                console.error('Failed to update product:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to update!',
                    text: 'Product update failed.',
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
                await axios.delete(`http://localhost:3000/product/deleteproduct/${id}`);
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'Product has been deleted.',
                    icon: 'success',
                });
                fetchProducts();
            } catch (error) {
                console.error('Failed to delete product:', error);
                MySwal.fire({
                    title: 'Failed!',
                    text: 'Failed to delete product.',
                    icon: 'error',
                });
            }
        }
    };

    const filteredProducts = searchTerm
        ? products.filter(product =>
            product.productId.includes(searchTerm) ||
            product.productName.includes(searchTerm)
        )
        : products;

    return (
        <div className="shadow-lg p-20 bg-white rounded-lg">
            <div className="relative overflow-x-auto l:rounded-lg">
                <h1 className="text-3xl text-blue-500 pl-1 pt-2">Products Table</h1>

                <div className='mb-2 mt-5 flex items-center'>
                    <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add Product
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
                            placeholder="Search by Product ID or Product Name"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="px-6 py-7">Product ID</th>
                            <th scope="col" className="px-6 py-7">Product Name</th>
                            <th scope="col" className="px-6 py-3">Available</th>
                            <th scope="col" className="px-6 py-3">Unit Price</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-6 py-4">{product.productId}</td>
                                <td className="px-6 py-4">{product.p_name}</td>
                                <td className="px-6 py-4">{product.available}</td>
                                <td className="px-6 py-4">{product.unitPrice}</td>
                                <td className="px-6 py-4">
                                    <button className="font-medium text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-3 rounded mr-2" onClick={() => handleEdit(product.id, product)}>
                                        Edit
                                    </button>
                                    <button className="font-medium text-white bg-red-500 hover:bg-red-600 py-1 px-3 rounded" onClick={() => handleRemove(product.id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

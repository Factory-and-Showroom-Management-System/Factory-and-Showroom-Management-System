import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Product() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        fetchProducts();
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

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/product/view');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const filteredProducts = searchTerm
        ? products.filter(product =>
            product.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.p_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : products;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredProducts.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

    const handlePrevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    const handleNextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);

    return (
        <div className="shadow-lg p-20 bg-white rounded-lg">
            <div className="relative overflow-x-auto l:rounded-lg">
                <h1 className="text-3xl text-blue-500 pl-1 pt-2">Product Table: {currentDateTime}</h1>

                <div className='mb-2 mt-5 flex items-center'>
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
                            <th scope="col" className="px-6 py-5">Product ID</th>
                            <th scope="col" className="px-6 py-3">Product Name</th>
                            <th scope="col" className="px-6 py-3">Available</th>
                            <th scope="col" className="px-6 py-3">Unit Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((product) => (
                            <tr key={product.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-6 py-3">{product.productId}</td>
                                <td className="px-6 py-3">{product.p_name}</td>
                                <td className="px-6 py-3">{product.available}</td>
                                <td className="px-6 py-3">{product.unitPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <nav className="flex items-center justify-between pt-2" aria-label="Table navigation">
    <span className="pl-10 text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing <span className="font-semibold text-gray-900 dark:text-black">{indexOfFirstRow + 1}-{indexOfLastRow > filteredProducts.length ? filteredProducts.length : indexOfLastRow}</span> of <span className="font-semibold text-gray-900 dark:text-black">{filteredProducts.length}</span> products out of <span className="font-semibold text-gray-900 dark:text-black">{products.length}</span>
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

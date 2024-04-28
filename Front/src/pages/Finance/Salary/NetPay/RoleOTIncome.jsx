import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function RoleOTIncome() {
    const [roleOTIncomes, setRoleOTIncomes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentDateTime, setCurrentDateTime] = useState('');


    const handleSubmit = async (event) => {
        //Fetch the data from the API  run to post: http://localhost:3000/salary/addsalary
        const response = await axios.post('http://localhost:3000/salary/addsalary', {
        });
        console.log(response);
    };


    const handleSubmitEarning = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addearning', {
        });
        console.log(response);
    };



    const handleSubmitUserLoan = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/autoaddusermonthloan', {
        });
        console.log(response);
    };

    const handleSubmitDeduct = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/autoadddeduction', {
        });
        console.log(response);
    };


    const handleSubmitEpsEtf = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/autoaddmonthepfetf', {
        });
        console.log(response);
    };



    const handleSubmitMonthFoodAllwance = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/autoaddmonthfoodallowance', {
        });
        console.log(response);
    };



    const handleSubmitMonthOT = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/autoaddmonthot', {
        });
        console.log(response);
    };


    const handleSubmitAdditon = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addadditions', {
        });
        console.log(response);
    };


    const handleSubmitNetPay = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addusernetpay', {
        });
        console.log(response);
    };


    const handleSubmitMonthSalarySheet = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addmonthsalarysheet', {
        });
        console.log(response);
    };

    const handleSubmitSubMonthSalarySheet = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addsubtotalmonthsalarysheet', {
        });
        console.log(response);
    };


    const handleSubmitAllMonthSalarySheet = async (event) => {

        const response = await axios.post('http://localhost:3000/salary/addallmonthsalarysheet', {
        });
        console.log(response);
    };








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
        fetchRoleOTIncomes();
        handleSubmit();
        handleSubmitEarning();
        handleSubmitUserLoan();
        handleSubmitDeduct();
        handleSubmitEpsEtf();
        handleSubmitMonthFoodAllwance();
        handleSubmitMonthOT();
        handleSubmitAdditon();
        handleSubmitNetPay();
        handleSubmitMonthSalarySheet();
        handleSubmitSubMonthSalarySheet();
        handleSubmitAllMonthSalarySheet();
    }, []);

    const fetchRoleOTIncomes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/salary/showroleotincome');
            setRoleOTIncomes(response.data);
        } catch (error) {
            console.error('Failed to fetch role overtime incomes:', error);
        }
    };

    const handleAdd = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Add New Role OT Income',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Role">
                <input id="swal-input2" class="swal2-input" placeholder="Overtime Income" type="number">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Add',
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        });

        if (formValues) {
            try {
                await axios.post(`http://localhost:3000/salary/addroleotincome`, {
                    role: formValues[0],
                    timeIncome: parseFloat(formValues[1])
                });
                MySwal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: 'New role overtime income has been added.',
                });
                fetchRoleOTIncomes();
                handleSubmit();
                handleSubmitEarning();
                handleSubmitUserLoan();
                handleSubmitDeduct();
                handleSubmitEpsEtf();
                handleSubmitMonthFoodAllwance();
                handleSubmitMonthOT();
                handleSubmitAdditon();
                handleSubmitNetPay();
                handleSubmitMonthSalarySheet();
                handleSubmitSubMonthSalarySheet();
                handleSubmitAllMonthSalarySheet();
            } catch (error) {
                console.error('Failed to add role overtime income:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to add!',
                    text: 'Adding new role overtime income failed.',
                });
            }
        }
    };

    const handleEdit = async (id, currentRole, currentTimeIncome) => {
        const { value: formValues } = await MySwal.fire({
            title: 'Edit Role OT Income',
            html: `
                <input id="swal-input1" class="swal2-input" value="${currentRole}">
                <input id="swal-input2" class="swal2-input" type="number" value="${currentTimeIncome}">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save Changes',
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        });

        if (formValues) {
            try {
                await axios.put(`http://localhost:3000/salary/updateroleotincome/${id}`, {
                    role: formValues[0],
                    timeIncome: parseFloat(formValues[1])
                });
                MySwal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Role overtime income has been updated.',
                });
                fetchRoleOTIncomes();
                handleSubmit();
                handleSubmitEarning();
                handleSubmitUserLoan();
                handleSubmitDeduct();
                handleSubmitEpsEtf();
                handleSubmitMonthFoodAllwance();
                handleSubmitMonthOT();
                handleSubmitAdditon();
                handleSubmitNetPay();
                handleSubmitMonthSalarySheet();
                handleSubmitSubMonthSalarySheet();
                handleSubmitAllMonthSalarySheet();

            } catch (error) {
                console.error('Failed to update role overtime income:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to update!',
                    text: 'Role overtime income update failed.',
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
                await axios.delete(`http://localhost:3000/salary/deleteroleotincome/${id}`);
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'Role overtime income has been deleted.',
                    icon: 'success',
                });
                fetchRoleOTIncomes();
                handleSubmit();
                handleSubmitEarning();
                handleSubmitUserLoan();
                handleSubmitDeduct();
                handleSubmitEpsEtf();
                handleSubmitMonthFoodAllwance();
                handleSubmitMonthOT();
                handleSubmitAdditon();
                handleSubmitNetPay();
                handleSubmitMonthSalarySheet();
                handleSubmitSubMonthSalarySheet();
                handleSubmitAllMonthSalarySheet();
                
            } catch (error) {
                console.error('Failed to delete role overtime income:', error);
                MySwal.fire({
                    title: 'Failed!',
                    text: 'Failed to delete role overtime income.',
                    icon: 'error',
                });
            }
        }
    };

    const filteredRoleOTIncomes = searchTerm
        ? roleOTIncomes.filter(income =>
            income.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            income.id.toString().includes(searchTerm)
        )
        : roleOTIncomes;

    const totalIncome = filteredRoleOTIncomes.reduce((acc, curr) => acc + curr.timeIncome, 0);

    // Calculate the indices of the first and last rows on the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    // Slice the data to get only the rows for the current page
    const currentRows = filteredRoleOTIncomes.slice(indexOfFirstRow, indexOfLastRow);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredRoleOTIncomes.length / rowsPerPage);

    const handlePrevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    const handleNextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);

    return (
        <div className="shadow-lg p-20 bg-white rounded-lg">
            <div className="relative overflow-x-auto l:rounded-lg">
                <h1 className="text-3xl text-blue-500 pl-1 pt-2">Role Overtime Income Table: {currentDateTime}</h1>

                <div className='mb-2 mt-5 flex items-center'>
                    <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add Role OT Income
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
                            placeholder="Search by Role or ID"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="px-6 py-7">ID</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Overtime Income</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((income) => (
                            <tr key={income.id} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-6 py-4">{income.id}</td>
                                <td className="px-6 py-4">{income.role}</td>
                                <td className="px-6 py-4">Rs. {income.timeIncome}</td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-white hover:underline" style={{ marginRight: '10px' }} onClick={() => handleEdit(income.id, income.role, income.timeIncome)}>Edit</a>
                                    <a href="#" className="font-medium text-white hover:underline" onClick={() => handleRemove(income.id)}>Remove</a>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-blue-800 text-white">
                            <td className="px-20 py-2 text-right font-bold" colSpan="2">Sub Total (Rs.) :</td>
                            <td className="px-6 font-bold" colSpan="2">Rs. {totalIncome.toFixed(2)}</td>

                        </tr>
                        <tr className="bg-blue-800 text-white">
                            <td className="px-20 text-right font-bold" colSpan="2">Total (Rs.) :</td>
                            <td className="px-6 py-2 font-bold" colSpan="2">Rs. {totalIncome.toFixed(4)}</td>

                        </tr>
                    </tbody>
                </table>

                <nav className="flex items-center justify-between pt-2" aria-label="Table navigation">
                    <span className="pl-10 text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing <span className="font-semibold text-gray-900 dark:text-black">{indexOfFirstRow + 1}-{indexOfLastRow > filteredRoleOTIncomes.length ? filteredRoleOTIncomes.length : indexOfLastRow}</span> of <span className="font-semibold text-gray-900 dark:text-black">{filteredRoleOTIncomes.length}</span>
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

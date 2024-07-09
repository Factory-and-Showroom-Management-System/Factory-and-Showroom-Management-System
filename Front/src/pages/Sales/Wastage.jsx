import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './popup.css';
import { FaRegCheckCircle, FaTools, FaExclamationCircle } from 'react-icons/fa';

const MySwal = withReactContent(Swal);


export default function Machine() {
    const [machines, setMachines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    useEffect(() => {
        fetchMachines();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const fetchMachines = async () => {
        try {
            const response = await fetch('http://localhost:3000/machine/view');
            if (!response.ok) {
                throw new Error('Failed to fetch machines');
            }
            const data = await response.json();
            // Calculate waste and waste percentage for each machine
            const machinesWithWaste = data.map(machine => ({
                ...machine,
                waste: machine.inputp - machine.outputp,
                wastePercentage: ((machine.inputp - machine.outputp) / machine.inputp) * 100,
                machinePerformance: calculateMachinePerformance(((machine.inputp - machine.outputp) / machine.inputp) * 100)
            }));
            setMachines(machinesWithWaste);
        } catch (error) {
            console.error('Failed to fetch machines:', error); 
        }
    };

    const calculateMachinePerformance = (wastePercentage) => {
        if (wastePercentage < 10) {
            return 'Good';
        } else if (wastePercentage >= 10 && wastePercentage < 30) {
            return 'Medium (Be Repair)';
        } else {
            return 'Repair Machine or Remove';
        }
    };

    const isPositiveNumber = (value) => {
        return parseFloat(value) > 0;
    };

    const handleAdd = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Add New Machine',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Machine ID" required>
                <input id="swal-input2" class="swal2-input" placeholder="Input" type="number" required>
                <input id="swal-input3" class="swal2-input" placeholder="Output" type="number" required>
                <input id="swal-input4" class="swal2-input" placeholder="Date In" type="date" required>
                <input id="swal-input5" class="swal2-input" placeholder="Time In" type="time" required>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Add',
            preConfirm: () => {
                const input = document.getElementById('swal-input2').value;
                const output = document.getElementById('swal-input3').value;
                if (!isPositiveNumber(input) || !isPositiveNumber(output)) {
                    Swal.showValidationMessage(
                        `Input and Output must be positive numbers`
                    );
                    return false;
                }
                return [
                    document.getElementById('swal-input1').value,
                    input,
                    output,
                    document.getElementById('swal-input4').value,
                    document.getElementById('swal-input5').value
                ]
            }
        });

        if (formValues) {
            try {
                const response = await fetch('http://localhost:3000/machine/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        machineId: formValues[0],
                        inputp: parseFloat(formValues[1]),
                        outputp: parseFloat(formValues[2]),
                        dateIn: formValues[3],
                        timeIn: formValues[4]
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to add machine');
                }
                MySwal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: 'New machine has been added.',
                });
                fetchMachines();
            } catch (error) {
                console.error('Failed to add machine:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to add!',
                    text: 'Adding new machine failed.',
                });
            }
        }
    };

    const handleEdit = async (id, currentData) => {
        const currentDate = new Date(currentData.dateIn).toISOString().split('T')[0]; // Get current date from the order data

        const { value: formValues } = await MySwal.fire({
            title: 'Edit Machine',
            html: `
            <div class="swal-input-container">
                <label for="swal-input1">Machine ID:</label>
                <input id="swal-input1" class="swal2-input" value="${currentData.machineId}" required>
                <label for="swal-input1">Input:</label>
                <input id="swal-input2" class="swal2-input" value="${currentData.inputp}" type="number" required>
                <label for="swal-input1">Output:</label>
                <input id="swal-input3" class="swal2-input" value="${currentData.outputp}" type="number" required>
                <label for="swal-input1">Date In:</label>
                <input id="swal-input4" class="swal2-input" value="${currentDate}" type="date"> <!-- Set current date -->
                <label for="swal-input1">Time In:</label>
                <input id="swal-input5" class="swal2-input" value="${currentData.timeIn}" type="time" required>
            </div>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save Changes',
            preConfirm: () => {
                const input = document.getElementById('swal-input2').value;
                const output = document.getElementById('swal-input3').value;
                if (!isPositiveNumber(input) || !isPositiveNumber(output)) {
                    Swal.showValidationMessage(
                        `Input and Output must be positive numbers`
                    );
                    return false;
                }
                return [
                    document.getElementById('swal-input1').value,
                    input,
                    output,
                    document.getElementById('swal-input4').value,
                    document.getElementById('swal-input5').value
                ]
            }
        });

        if (formValues) {
            try {
                const response = await fetch(`http://localhost:3000/machine/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        machineId: formValues[0],
                        inputp: parseFloat(formValues[1]),
                        outputp: parseFloat(formValues[2]),
                        dateIn: formValues[3],
                        timeIn: formValues[4]
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to update machine');
                }
                MySwal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Machine has been updated.',
                });
                fetchMachines();
            } catch (error) {
                console.error('Failed to update machine:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to update!',
                    text: 'Machine update failed.',
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
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3000/machine/delete/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Failed to delete machine');
                }
                MySwal.fire({
                    title: 'Deleted!',
                    text: 'Machine has been deleted.',
                    icon: 'success',
                });
                fetchMachines();
            } catch (error) {
                console.error('Failed to delete machine:', error);
                MySwal.fire({
                    title: 'Failed!',
                    text: 'Failed to delete machine.',
                    icon: 'error',
                });
            }
        }
    };

    const filteredMachines = searchTerm
        ? machines.filter(machine =>
            machine.machineId.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : machines;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredMachines.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredMachines.length / rowsPerPage);

    const handlePrevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
    const handleNextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);

    return (
        <div className="shadow-lg p-20 bg-white rounded-lg">
            <div className="relative overflow-x-auto l:rounded-lg">
                <h2 className="text-3xl text-black pl-1 pt-2"> Machines and Wastage Details</h2>
                <div className='mb-2 mt-5 flex items-center'>
                    <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add Machine
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
                            placeholder="Search by Machine ID"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-black uppercase bg-[#54db93]">
                        <tr>
                            <th scope="col" className="px-6 py-5">Machine ID</th>
                            <th scope="col" className="px-6 py-3">Input(kg)</th>
                            <th scope="col" className="px-6 py-3">Output(kg)</th>
                            <th scope="col" className="px-6 py-3">Date In</th>
                            <th scope="col" className="px-6 py-3">Time In</th>
                            <th scope="col" className="px-6 py-3">Waste(kg)</th>
                            <th scope="col" className="px-6 py-3">Waste Percentage</th>
                            <th scope="col" className="px-6 py-3">Machine Performance</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((machine) => (
                            <tr key={machine.id} className="bg-[#cdf8da] text-black border-b border-[#4bf885] hover:bg-[#a1f0c6]">
                                <td className="px-6 py-3">{machine.machineId}</td>
                                <td className="px-6 py-3">{machine.inputp}</td>
                                <td className="px-6 py-3">{machine.outputp}</td>
                                <td className="px-6 py-3">{formatDate(machine.dateIn)}</td>
                                <td className="px-6 py-3">{machine.timeIn}</td>
                                <td className="px-6 py-3">{machine.waste}</td>
                                <td className="px-6 py-3">{machine.wastePercentage.toFixed(2)}%</td>
                                <td className="px-6 py-3">
                                    {machine.machinePerformance === 'Good' && (
                                        <span className="inline-block h-4 w-4 rounded-full bg-green-500 mr-2"></span>
                                    )}
                                    {machine.machinePerformance === 'Medium (Be Repair)' && (
                                        <span className="inline-block h-4 w-4 rounded-full bg-yellow-500 mr-2"></span>
                                    )}
                                    {machine.machinePerformance === 'Repair Machine or Remove' && (
                                        <span className="inline-block h-4 w-4 rounded-full bg-red-500 mr-2"></span>
                                    )}
                                    {machine.machinePerformance}
                                </td>
                                <td className="px-6 py-3">
                                    <button className="font-medium text-sm text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-2 rounded mr-2" onClick={() => handleEdit(machine.id, machine)}>
                                        Edit
                                    </button>
                                    <button className="font-medium text-sm text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded" onClick={() => handleRemove(machine.id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <nav className="flex items-center justify-between pt-2" aria-label="Table navigation">
                    <span className="pl-10 text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing <span className="font-semibold text-gray-900 dark:text-black">{indexOfFirstRow + 1}-{indexOfLastRow > filteredMachines.length ? filteredMachines.length : indexOfLastRow}</span> of <span className="font-semibold text-gray-900 dark:text-black">{filteredMachines.length}</span> machines out of <span className="font-semibold text-gray-900 dark:text-black">{machines.length}</span>
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


  
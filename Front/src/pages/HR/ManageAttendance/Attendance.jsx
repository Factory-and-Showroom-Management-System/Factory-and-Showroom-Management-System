import React, { useState, useEffect } from 'react';

export default function Attendance() {
    const [attendanceList, setAttendanceList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAttendanceList();
    }, []);

    const fetchAttendanceList = async () => {
        try {
            const response = await fetch('http://localhost:3000/attendance/showattendance');
            const data = await response.json();
            setAttendanceList(data);
        } catch (error) {
            console.error('Failed to fetch attendance:', error);
        }
    };

    const handlePrevPage = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    const handleNextPage = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));

    const handleTimeIn = async (userId, name, role) => {
        const timeIn = new Date().toLocaleTimeString();
        const updatedAttendanceList = attendanceList.map(attendance => {
            if (attendance.userId === userId) {
                return { ...attendance, timeIn: timeIn };
            }
            return attendance;
        });
        setAttendanceList(updatedAttendanceList);

        try {
            await fetch(`http://localhost:3000/attendance/updateattendance/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, name, role, timeIn }),
            });
        } catch (error) {
            console.error('Failed to update time in:', error);
        }
    };

    const handleTimeOut = async (userId, name, role) => {
        const timeOut = new Date().toLocaleTimeString();
        const updatedAttendanceList = attendanceList.map(attendance => {
            if (attendance.userId === userId) {
                return { ...attendance, timeOut: timeOut };
            }
            return attendance;
        });
        setAttendanceList(updatedAttendanceList);

        // Fetch the existing timeIn to preserve its value
        const existingAttendance = attendanceList.find(attendance => attendance.userId === userId);
        const { timeIn } = existingAttendance || {};

        try {
            await fetch(`http://localhost:3000/attendance/updateattendance/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, name, role, timeIn, timeOut }),
            });
            window.location.reload();  // Refresh the browser
        } catch (error) {
            console.error('Failed to update time out:', error);
        }
    };

    const filteredAttendance = searchTerm
        ? attendanceList.filter(attendance =>
            (attendance.userId && attendance.userId.toString().includes(searchTerm)) ||
            (attendance.name && attendance.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (attendance.role && attendance.role.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : attendanceList;

    const totalPages = Math.ceil(filteredAttendance.length / rowsPerPage);
    const indexFrom = (currentPage - 1) * rowsPerPage;
    const indexTo = currentPage * rowsPerPage;

    return (
        <div className="attendance-container">
            <h1>Attendance</h1>
            <div className='mb-2 mt-5 flex items-center'>
                <div className="relative ml-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-80 h-10 pl-10 pr-3 py-2 text-ml border border-[#54db93] rounded-lg text-blue-500 focus:ring-[#54db93]"
                        placeholder="Search by User ID or Name"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-black uppercase bg-[#54db93]">
                    <tr>
                        <th scope="col" className="px-6 py-3">User ID</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Role</th>
                        <th scope="col" className="px-6 py-3">Date In</th>
                        <th scope="col" className="px-6 py-3">Time In</th>
                        <th scope="col" className="px-6 py-3">Time Out</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-xs text-black uppercase bg-[#cdf8da] border-b border-[#4bf885]">
                    {filteredAttendance.slice(indexFrom, indexTo).map((attendance) => (
                        <tr key={attendance.userId} className="attendance-item hover:bg-[#a1f0c6]">
                            <td className="px-6 py-4">{attendance.userId}</td>
                            <td className="px-6 py-4">{attendance.name}</td>
                            <td className="px-6 py-4">{attendance.role}</td>
                            <td className="px-6 py-4">{attendance.dateIn}</td>
                            <td className="px-6 py-4">{attendance.timeIn}</td>
                            <td className="px-6 py-4">{attendance.timeOut}</td>
                            <td className="px-6 py-4">{attendance.status}</td>
                            <td className="px-6 py-4">
                                <button 
                                    className="px-2 py-1 mr-2 bg-green-500 text-white rounded"
                                    onClick={() => handleTimeIn(attendance.userId, attendance.name, attendance.role)}
                                >
                                    Time In
                                </button>
                                <button 
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                    onClick={() => handleTimeOut(attendance.userId, attendance.name, attendance.role)}
                                >
                                    Time Out
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-controls mt-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="mx-2">
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

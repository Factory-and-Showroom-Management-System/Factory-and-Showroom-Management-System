// TotalMonthlyAttendanceCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Ensure you have the date picker installed
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for date picker

const TotalMonthlyAttendanceCard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalAttendance, setTotalAttendance] = useState(0);

    useEffect(() => {
        if (selectedDate) {
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Format month as MM

            const fetchTotalAttendance = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/attendance/totalMonthlyAttendance', {
                        params: { year, month }
                    });
                    setTotalAttendance(response.data.totalAttendance);
                } catch (error) {
                    console.error('Failed to fetch total monthly attendance:', error);
                }
            };

            fetchTotalAttendance();
        }
    }, [selectedDate]);

    return (
        <div className="card p-4 bg-blue-700 border border-gray-200 rounded-lg shadow w-72 dark:bg-blue-600 dark:border-gray-100 hover:bg-blue-600 dark:hover:bg-blue-70 transition duration-300 ease-in-out transform hover:scale-105">
            <div className='flex items-center'>
                <svg className='' width="60px" height="60px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024">
                    {/* SVG Path */}
                </svg>
                <label className="mt-4 ml-3 text-3xl font-semibold text-black dark:text-white">Total Monthly Attendance</label>
            </div>
            <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                className="form-control mt-4"
            />
            <div className="mt-2">
                <p className="mt-4 ml-3 text-3xl font-semibold text-black dark:text-white">Count: {totalAttendance}</p>
            </div>
        </div>
    );
};

export default TotalMonthlyAttendanceCard;

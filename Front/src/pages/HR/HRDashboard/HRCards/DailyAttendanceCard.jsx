// DailyAttendanceCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Ensure you have the date picker installed
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for date picker

const DailyAttendanceCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalAttendance, setTotalAttendance] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const fetchTotalAttendance = async () => {
        try {
          const response = await axios.get('http://localhost:3000/attendance/totalDailyAttendance', {
            params: {
                date: selectedDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            },
          });
          setTotalAttendance(response.data.totalAttendance);
        } catch (error) {
          console.error('Error fetching total attendance:', error);
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
      <label className="mt-4 ml-3 text-3xl font-semibold text-black dark:text-white">Daily Attendance</label>
    </div>
    <DatePicker
      selected={selectedDate}
      onChange={date => setSelectedDate(date)}
      dateFormat="yyyy-MM-dd"
      className="form-control mt-4"
    />
    <div className="mt-2">
      <p className="mt-4 ml-3 text-3xl font-semibold text-black dark:text-white">
        Count: {totalAttendance !== null ? totalAttendance : 'Loading...'}
      </p>
    </div>
  </div>
);
}

export default DailyAttendanceCard;

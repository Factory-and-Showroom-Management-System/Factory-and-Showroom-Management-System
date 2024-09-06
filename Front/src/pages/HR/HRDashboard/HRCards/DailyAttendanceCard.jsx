import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

const DailyAttendanceCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalAttendance, setTotalAttendance] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const fetchTotalAttendance = async () => {
        try {
          // Split the selected date into year, month, and date
          const year = selectedDate.getFullYear();
          const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
          const date = String(selectedDate.getDate()).padStart(2, '0'); // getDate() returns 1-31

          console.log("Selected Date:", { year, month, date }); // Debugging

          const response = await axios.get('http://localhost:3000/attendance/totaldailyattendance', {
            params: { year, month, date }
          });

          if (response.data && response.data.totalDailyAttendance !== undefined) {
            setTotalAttendance(response.data.totalDailyAttendance);
          } else {
            setTotalAttendance(0); // Fallback if no attendance data is available
          }
        } catch (error) {
          console.error('Error fetching total attendance:', error);
          setTotalAttendance(0); // Set to 0 if there's an error
        }
      };

      fetchTotalAttendance();
    }
  }, [selectedDate]);

  return (
    <div className="card p-4 bg-[#a1f0c6] border border-gray-200 rounded-lg shadow w-72 dark:bg-[#54db93] dark:border-gray-100 hover:bg-[#54db93] dark:hover:bg-blue-70 transition duration-300 ease-in-out transform hover:scale-105">
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

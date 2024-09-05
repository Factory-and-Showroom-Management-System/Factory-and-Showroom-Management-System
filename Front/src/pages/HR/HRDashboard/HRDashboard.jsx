import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AttendanceChart from './Charts/AttendanceChart';
import TotalMonthlyAttendanceCard from './HRCards/MonthlyAttendanceCard'; // Updated import for TotalMonthlyAttendanceCard
import DailyAttendanceCard from './HRCards/DailyAttendanceCard'; // Keep DailyAttendanceCard

const HRDashboard = () => {
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const location = useLocation();

  const handleDashboardClick = () => {
    setDashboardClicked(!dashboardClicked);
  };

  return (
    <div>
      <div className="mb-2">
        <h2 className="text-3xl text-black pl-1 pt-2">Dashboard</h2>
      </div>
      <div className='flex gap-4'>
        <div className='p-4 mt-3'>
          <TotalMonthlyAttendanceCard /> {/* Updated to use TotalMonthlyAttendanceCard */}
        </div>
        <div className='p-4 mt-3'>
          <DailyAttendanceCard />
        </div>
        <div className='pt-4 mt-3'>
          <AttendanceChart />
        </div>
      </div>
      <div className='w-full p-5'></div>
    </div>
  );
}

export default HRDashboard;

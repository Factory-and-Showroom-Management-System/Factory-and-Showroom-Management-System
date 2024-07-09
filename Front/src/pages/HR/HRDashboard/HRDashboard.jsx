import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AttendanceChart from './Charts/AttendanceChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HRDashboard = () => {
  const [dashboardClicked, setDashboardClicked] = useState(false);
  const location = useLocation();

  const handleDashboardClick = () => {
    setDashboardClicked(!dashboardClicked);
  };

  return (
    <div>
      <div className="mb-2">
      <h2 className="text-3xl text-black pl-1 pt-2 ">Dashboard</h2>
        <Link to="/hr/profile">
          <div
            className={`rounded-full hover:bg-[#cdf8da] ${location.pathname === '/hr/profile' ? "bg-[#cdf8da] text-black" : ""}`}
            onClick={handleDashboardClick}
          >
            <AccountCircleIcon className="inline-block mr-2" />
            Profiles
          </div>
        </Link>
      </div>
      <div className="mb-2">
        <Link to="/hr/attendance">
          <div
            className={`rounded-full hover:bg-[#cdf8da] ${location.pathname === '/hr/attendance' ? "bg-[#cdf8da] text-black" : ""}`}
            onClick={handleDashboardClick}
          >
            <AccountCircleIcon className="inline-block mr-2" />
            Attendance
          </div>
        </Link>
      </div>
      <div className='flex gap-4'>
        <div className='p-4 mt-3'>
          <Routes>
            <Route path="/hr/attendance" element={<AttendanceChart/>} />
            <Route path="/hr/profile" element={<div>Profiles Component</div>} />
          </Routes>
        </div>
        <div className='pt-4 mt-3'><AttendanceChart /></div>
        <div className='p-4 mt-3'></div>
        <div className='pt-4 mt-3'></div>
      </div>
      <div></div>
      <div className='w-full p-5'></div>
    </div>
  );
}

export default HRDashboard;

import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { blue } from '@mui/material/colors';

export default function AttendanceChart() {
  const [attendanceData, setAttendanceData] = useState({ names: [], statuses: [] });

  useEffect(() => {
    fetch('http://localhost:3000/attendance/showattendance')
      .then(response => response.json())
      .then(data => {
        const names = data.map(item => item.name);
        const statuses = data.map(item => item.status === 'Present' ? 1 : 0); // 1 for Present, 0 for Absent
        setAttendanceData({ names, statuses });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Attendance by User</h2>
      <BarChart
        width={500}
        height={300}
        data={attendanceData.statuses.map((value, index) => ({ x: attendanceData.names[index], y: value }))}
        xAxisLabel="User"
        yAxisLabel="Attendance"
        series={[{ data: attendanceData.statuses, label: 'Attendance', type: 'bar' }]}
        colors={[blue[600]]}
      />
    </div>
  );
}



import { useState, useEffect } from 'react';
import { blue } from '@mui/material/colors';
import { BarChart } from '@mui/x-charts/BarChart';

export default function SalaryBarChart() {
  const [userData, setUserData] = useState({ names: [], netTotals: [] });

  useEffect(() => {
    fetch('http://localhost:3000/salary/showusernetpay')
      .then(response => response.json())
      .then(data => {
        const names = data.map(item => item.name);
        const netTotals = data.map(item => item.netTotal);
        setUserData({ names, netTotals });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Net Pay by User</h2>
      <BarChart
        width={500}
        height={300}
        data={userData.netTotals.map((value, index) => ({ x: userData.names[index], y: value }))}
        xAxisLabel="User"
        yAxisLabel="Net Pay"
        series={[{ data: userData.netTotals, label: 'Net Pay', type: 'bar' }]}
        colors={[blue[600]]}
      />
    </div>
  );
}

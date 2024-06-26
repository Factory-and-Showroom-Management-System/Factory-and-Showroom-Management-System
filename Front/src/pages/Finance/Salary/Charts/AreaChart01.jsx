// import React, { useState, useEffect } from 'react';
// import Chart from 'chart.js/auto';

// export default function AreaChart01() {
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/salary/showusernetpay');
//       const data = await response.json();
//       setUserData(data);
//       createChart(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const createChart = (data) => {
//     const ctx = document.getElementById('myChart');

//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: data.map((user) => user.name),
//         datasets: [{
//           label: 'Net Pay',
//           data: data.map((user) => user.netTotal),
//           backgroundColor: 'rgba(54, 162, 235, 0.2)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1,
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         },
//         responsive: true,
//         maintainAspectRatio: false, // Allows you to change the chart size dynamically
//       }
//     });
//   };

//   return (
//     <div className='mx-auto w-4/5 lg:w-2/5 mt-10 '>
//       <canvas id="myChart"></canvas> {/* Set width and height here */}
//     </div>
//   );
// }

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

import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function AreaChart01() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/salary/showusernetpay');
      const data = await response.json();
      setUserData(data);
      createChart(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createChart = (data) => {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((user) => user.name),
        datasets: [{
          label: 'Net Pay',
          data: data.map((user) => user.netTotal),
          fill: false, // Do not fill the area under the line
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    
    <div className='mx-auto w-4/5 lg:w-2/5 mt-10 '>
      <canvas id="myChart" ></canvas> 
    </div>
  );
}

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
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Net Pay',
          data: data.map((user) => ({
            x: user.netTotal, // x-axis value
            y: Math.random() * 100, // y-axis value (random for demonstration)
            r: 10, // bubble radius (you can adjust this)
          })),
          backgroundColor: 'rgb(255, 99, 132)', // bubble color
        }]
      },
      options: {}
    });
  };

  return (
    <div className='mx-auto w-4/5 lg:w-2/5 mt-10'>
      <canvas id="myChart"></canvas> 
    </div>
  );
}

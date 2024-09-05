import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function PolarAreaChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/salary/showusernetpay');
      const data = await response.json();
      setChartData(data);
      createChart(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createChart = (data) => {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: data.map((user) => user.name),
        datasets: [{
          label: 'My First Dataset',
          data: data.map((user) => user.netTotal),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
          ]
        }]
      },
      options: {}
    });
  };

  return (
    <div className='mx-auto w-1/4 mg:w-1/3 mt-10'>
      <canvas id="myChart" width="200" height="200"></canvas> 
    </div>
  );
}

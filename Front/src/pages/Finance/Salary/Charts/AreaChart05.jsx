import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function LineChart() {
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
      type: 'line',
      data: {
        labels: data.map((user) => user.name),
        datasets: [{
          label: 'Net Pay',
          data: data.map((user) => user.netTotal),
          fill: false,
          borderColor: '#124DDE',
          tension: 0.1
        }]
      },
      options: {}
    });
  };

  return (
    <div className='mx-auto w-2/4 mg:w-1/3 mt-10'>
      <canvas id="myChart" width="1000" height="400"></canvas> 
    </div>
  );
}

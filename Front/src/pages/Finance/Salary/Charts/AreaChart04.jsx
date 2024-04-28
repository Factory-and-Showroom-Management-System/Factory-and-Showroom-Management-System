import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function PieChart() {
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
      type: 'pie',
      data: {
        labels: data.map((user) => user.name),
        datasets: [{
          label: 'Net Pay',
          data: data.map((user) => user.netTotal),
          backgroundColor: [
            '#0902A6',
            '#0F07BF',
            '#180FE8',
            '#124CFF',
            '#0063FF',
          ],
          hoverOffset: 4
        }]
      },
      options: {}
    });
  };

  return (
    <div className='mx-auto w-1/4 mg:w-1/3 mt-10'>
      <canvas id="myChart" width="50" height="50"></canvas> 
    </div>
  );
}

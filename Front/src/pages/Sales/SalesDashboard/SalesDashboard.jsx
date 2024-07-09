import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import './SalesDashboard.css';

const SalesDashboard = () => {
    const [customersData, setCustomersData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [machinesData, setMachinesData] = useState([]);
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        // Extended mock data for testing
        const mockCustomersData = [
            { date: '2023-01-01', count: 50 },
            { date: '2023-02-01', count: 60 },
            { date: '2023-03-01', count: 70 },
            { date: '2023-04-01', count: 80 },
            { date: '2023-05-01', count: 90 },
        ];
        const mockProductsData = [
            { name: 'Pre Opened Poly Bags On a Roll', count: 200 },
            { name: 'Poly Bag', count: 300 },
            { name: 'MTG Card Sleeves', count: 250 },
            { name: 'Auto Bag', count: 400 },
        ];
        const mockOrdersData = [
            { date: '2023-01-01', count: 30 },
            { date: '2023-02-01', count: 40 },
            { date: '2023-03-01', count: 50 },
            { date: '2023-04-01', count: 60 },
            { date: '2023-05-01', count: 70 },
        ];
        const mockMachinesData = [
            { name: 'Machine 1', count: 10 },
            { name: 'Machine 2', count: 20 },
            { name: 'Machine 3', count: 15 },
            { name: 'Machine 4', count: 25 },
            { name: 'Machine 5', count: 30 },
        ];
        const mockSalesData = [
            { name: 'Pre Opened Poly Bags On a Roll', value: 400 },
            { name: 'Poly Bag', value: 300 },
            { name: 'MTG Card Sleeves', value: 300 },
            { name: 'Auto Bag', value: 200 },
        ];

        setCustomersData(mockCustomersData);
        setProductsData(mockProductsData);
        setOrdersData(mockOrdersData);
        setMachinesData(mockMachinesData);
        setSalesData(mockSalesData);
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Calculate total sales for display
    const totalSales = salesData.reduce((total, item) => total + item.value, 0);

    return (
        <div className="sales-dashboard">
            <h1>Sales Dashboard</h1>
            
            <div className="chart-container">
                <h2>Sales Performance</h2>
                <div className="sales-performance-card">
                    <p>Total Sales: ${totalSales}</p>
                    {/* Add more metrics or data as needed */}
                </div>
            </div>

            <div className="chart-container">
                <h2>Customers Data</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={customersData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            {/* Existing charts */}
            
            <div className="chart-container">
                <h2>Products Data</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-container">
                <h2>Orders Data</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ordersData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-container">
                <h2>Machines Data</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={machinesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-container">
                <h2>Sales Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={salesData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {salesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                    </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesDashboard;

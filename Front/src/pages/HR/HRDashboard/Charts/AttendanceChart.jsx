import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function AttendanceChart() {
    const [attendanceData, setAttendanceData] = useState({ names: [], averages: [] });

    useEffect(() => {
        fetch('http://localhost:3000/attendance/average-archived-attendance')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // Log the data to check its structure
                const names = data.averages.map(item => item.name);
                const averages = data.averages.map(item => item.averageAttendance);
    
                setAttendanceData({ names, averages });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Check if data is populated
    console.log('Attendance Data:', attendanceData);

    return (
        <div>
            <h2>Average Archived Attendance by User</h2>
            {attendanceData.names.length > 0 && attendanceData.averages.length > 0 ? (
                <BarChart
                    width={500}
                    height={300}
                    data={attendanceData.names.map((name, index) => ({
                        name: name, 
                        averageAttendance: attendanceData.averages[index]
                    }))}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="averageAttendance" fill="#a1f0c6" />
                </BarChart>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

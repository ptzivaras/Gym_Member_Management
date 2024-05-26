import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import './AboutPage.css'; // Import the CSS file

function AboutPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const currentCustomers = customers.length;
  const maxCapacity = 75;
  const remainingCapacity = maxCapacity - currentCustomers;

  // Data for the pie chart
  const data = [
    { name: 'Customers', value: currentCustomers },
    { name: 'Available Slots', value: remainingCapacity },
  ];

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="container"> {/* Apply the container class */}
      <h1>Welcome to About page</h1>

      <h3>Number of Customers: {currentCustomers}</h3>
      <h3>Space for More Customers: {75-currentCustomers}</h3>

      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default AboutPage;

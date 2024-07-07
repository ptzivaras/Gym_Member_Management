import React from 'react';
import {
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid
} from 'recharts';
import styled from 'styled-components';

const mockData = {
  barChartData: [
    { name: 'Yoga', value: 300 },
    { name: 'Pilates', value: 200 },
    { name: 'HIIT', value: 180 },
    { name: 'Dance', value: 150 },
    { name: 'Strength', value: 120 },
  ],
  lineChartData: [
    { name: 'Week 1', income: 5000, cost: 2000 },
    { name: 'Week 2', income: 6000, cost: 2500 },
    { name: 'Week 3', income: 7000, cost: 3000 },
    { name: 'Week 4', income: 8000, cost: 3500 },
  ],
  customerStats: [
    { name: 'Total Customers', value: 300 },
    { name: 'New Customers', value: 100 },
    { name: 'Customers Left', value: 50 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4444'];

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  padding: 20px;
  background-color: #f5f5f5;
`;

const GridOne = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
`;

const GridTwo = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
`;

const ChartBox = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <GridOne>
        <ChartBox>
          <h3>Number of Classes, Trainers, and Customers</h3>
          <p>Number of Classes: 5</p>
          <p>Number of Trainers: 10</p>
          <p>Number of Customers: 300</p>
          <p>New Customers: 100</p>
          <p>Customers Left: 50</p>
        </ChartBox>
        <ChartBox>
          <h3>Top 5 Classes</h3>
          <BarChart width={500} height={300} data={mockData.barChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="value">
              {mockData.barChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartBox>
        <ChartBox>
          <h3>Monthly Income and Trainer Costs</h3>
          <LineChart width={500} height={300} data={mockData.lineChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="income" stroke="#8884d8" />
            <Line type="monotone" dataKey="cost" stroke="#FF4444" />
          </LineChart>
        </ChartBox>
      </GridOne>
      <GridTwo>
        <ChartBox>
          <h3>Customer Statistics</h3>
          <BarChart width={500} height={300} data={mockData.customerStats}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8">
              {mockData.customerStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartBox>
        <ChartBox>
          <h3>Monthly and Yearly Income</h3>
          <p>Monthly Income: $25,000</p>
          <p>Yearly Income: $300,000</p>
        </ChartBox>
      </GridTwo>
    </DashboardContainer>
  );
}

export default Dashboard;

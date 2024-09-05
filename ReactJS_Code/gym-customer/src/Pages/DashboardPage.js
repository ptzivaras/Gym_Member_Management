import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './DashboardPage.scss';

const mockData = {
  topCardsData: [
    { title: 'Membership Sales', value: '120', percentage: '+12%', trend: 'up' },
    { title: 'Revenue', value: '€4500', percentage: '+20%', trend: 'up' },
    { title: 'Customers', value: '360', percentage: '+24%', trend: 'down' },
  ],
  gymCapacity: [
    { name: 'Free Space', value: 160 },
    { name: 'Occupied', value: 140 },
  ],
  revenueProfitData: [
    { name: 'Mon', revenue: 8000, profit: 3000 },
    { name: 'Tue', revenue: 9000, profit: 3500 },
    { name: 'Wed', revenue: 7500, profit: 3200 },
    { name: 'Thu', revenue: 10000, profit: 4000 },
    { name: 'Fri', revenue: 8500, profit: 3300 },
    { name: 'Sat', revenue: 9200, profit: 3700 },
    { name: 'Sun', revenue: 9700, profit: 3800 },
  ],
  salesByCategory: [
    { name: 'Workout', value: 40 },
    { name: 'Team Programs', value: 25 },
    { name: 'Martial Arts', value: 35 },
  ],
  recentSales: [
    { name: 'De Light', category: 'Dance', price: '1 Month', status: 'New Customer' },
    { name: 'Eva James', category: 'Boxing', price: '1 Month', status: 'New Customer' },
    { name: 'Sotiris Papakanelos', category: 'Workout', price: '12 Months', status: 'Renewal' },
    { name: 'Thomas Pappas', category: 'Fitness', price: '3 Month', status: 'New Customer' },
    { name: 'Eric Yoro', category: 'MMA', price: '3 Month', status: 'New Customer' },
  ],
  topProducts: [
    { name: 'John Cena', price: '40 Hours', rating: 5 },
    { name: 'Eva Mendes', price: '32 Hours', rating: 4 },
    { name: 'Jogn Thomas', price: '24 Hours', rating: 3 },
    { name: 'Jessica Adams', price: '34 Hours', rating: 4 },
  ],
  overviewData: [
    { name: 'January', income: 7000, expenses: 5000 },
    { name: 'February', income: 8000, expenses: 6000 },
    { name: 'March', income: 6000, expenses: 4000 },
    { name: 'April', income: 9000, expenses: 7000 },
    { name: 'May', income: 8500, expenses: 6500 },
    { name: 'June', income: 7500, expenses: 5500 },
  ],
  recentTransactions: [
    { fullName: 'Alice Williams', duration: '6 Months', date: '06/23/2023', amount: '500€' },
    { fullName: 'Brad Curry', duration: '1 Month', date: '04/12/2023', amount: '500€' },
    { fullName: 'Kevin James', duration: '3 Months', date: '04/29/2023', amount: '600€' },
    { fullName: 'Claire Dunphy', duration: '12 Months', date: '04/15/2023', amount: '152€' },
    { fullName: 'Sarah McTammish', duration: '1 Month', date: '04/12/2023', amount: '125€' },
  ],
};

const COLORS = ['#00C49F', '#FF4444'];

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Top Cards Section */}
      <div className="dashboard-header">
        {mockData.topCardsData.map((card, index) => (
          <div className="dashboard-card" key={index}>
            <div className="dashboard-card-content">
              <div className="dashboard-info">
                <h4>{card.title}</h4>
                <p className="dashboard-value">{card.value}</p>
                <div className="dashboard-percentage">
                  <span className={`percentage ${card.trend}`}>
                    {card.percentage} <span className="arrow">{card.trend === 'up' ? '↑' : '↓'}</span>
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="70%" height={80}>
                <LineChart data={mockData.revenueProfitData}>
                  <Line type="monotone" dataKey="revenue" stroke="#00C49F" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}

        {/* Gym Capacity Card with Pie Chart and Title */}
        <div className="dashboard-card">
          <div className="dashboard-card-content">
            <div className="dashboard-info">
              <h4>Gym Capacity</h4>
              <p>Full capacity: 300</p>
              <p>Free: 160</p>
              <p>Current: 140</p>
            </div>
            <ResponsiveContainer width="70%" height={180}>
              <PieChart>
                <Pie
                  data={mockData.gymCapacity}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  fill="#00C49F"
                  dataKey="value"
                >
                  {mockData.gymCapacity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="dashboard-main">
        <div className="dashboard-chart-large">
          <h3>Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.revenueProfitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#00C49F" />
              <Bar dataKey="profit" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="dashboard-chart-small">
          <h3>Sales by Programs</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={mockData.salesByCategory}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#00C49F"
              label
            >
              {mockData.salesByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="dashboard-bottom">
        <div className="dashboard-recent-sales">
          <h3>Recent Customers</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Program</th>
                <th>Duration</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {mockData.recentSales.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.name}</td>
                  <td>{sale.category}</td>
                  <td>{sale.price}</td>
                  <td className={sale.status === 'Renewal' ? 'renewal' : 'new-customer'}>
                    {sale.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dashboard-top-products">
          <h3>Top Trainers</h3>
          <ul>
            {mockData.topProducts.map((product, index) => (
              <li key={index}>
                <span>{product.name}</span>
                <span className="rating">{'★'.repeat(product.rating)}</span>
                <span>{product.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modified 4th Row with Two Line Charts for Income and Expenses */}
      <div className="dashboard-new-row">
        <div className="dashboard-recent-transactions">
          <h3>Recent Transactions</h3>
          <ul className="transactions-list">
            {mockData.recentTransactions.map((transaction, index) => (
              <li key={index} className="transaction-item">
                <span className="transaction-name">{transaction.fullName}</span>
                <span className="transaction-date">{transaction.duration}</span>
                <span className="transaction-date">{transaction.date}</span>
                <span className="transaction-amount">{transaction.amount}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-overview-chart">
          <h3>Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#00C49F" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

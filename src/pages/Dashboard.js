import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { transactionAPI } from '../api/api';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    recentTransactions: [],
    categoryBreakdown: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await transactionAPI.getDashboardStats();
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };

  const chartData = Object.keys(stats.categoryBreakdown).map(category => ({
    name: category,
    value: stats.categoryBreakdown[category]
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <Container fluid className="dashboard-container py-4">
      <h1 className="mb-4">💰 Dashboard</h1>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="stat-card income">
            <Card.Body>
              <h5>Total Income</h5>
              <h2>₹ {stats.totalIncome.toFixed(2)}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="stat-card expense">
            <Card.Body>
              <h5>Total Expense</h5>
              <h2>₹ {stats.totalExpense.toFixed(2)}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="stat-card balance">
            <Card.Body>
              <h5>Balance</h5>
              <h2>₹ {stats.balance.toFixed(2)}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="mb-4">
        <Col lg={6} className="mb-3">
          <Card>
            <Card.Body>
              <h5>Expense by Category</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ₹${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-3">
          <Card>
            <Card.Body>
              <h5>Category Breakdown</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5>Recent Transactions</h5>
            </Card.Header>
            <Card.Body>
              {stats.recentTransactions.length > 0 ? (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentTransactions.map(transaction => (
                      <tr key={transaction._id}>
                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                        <td>{transaction.description || 'N/A'}</td>
                        <td>{transaction.category}</td>
                        <td>
                          <span className={`badge bg-${transaction.type === 'income' ? 'success' : 'danger'}`}>
                            {transaction.type.toUpperCase()}
                          </span>
                        </td>
                        <td className={transaction.type === 'income' ? 'text-success' : 'text-danger'}>
                          {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No transactions yet</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center mt-4">
        <a href="/transactions" className="btn btn-primary">View All Transactions</a>
      </div>
    </Container>
  );
};

export default Dashboard;

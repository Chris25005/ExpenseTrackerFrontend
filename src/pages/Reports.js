import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { transactionAPI } from '../api/api';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Reports.css';

const Reports = () => {
  const [reportType, setReportType] = useState('monthly');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      if (reportType === 'monthly') {
        const response = await transactionAPI.getMonthlySummary(year, month);
        setReportData(response.data);
      } else {
        const response = await transactionAPI.getYearlySummary(year);
        const chartData = Object.keys(response.data.monthlyData).map(month => ({
          name: new Date(0, month - 1).toLocaleString('default', { month: 'short' }),
          income: response.data.monthlyData[month].income,
          expense: response.data.monthlyData[month].expense,
          savings: response.data.monthlyData[month].savings
        }));
        setReportData({ ...response.data, chartData });
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
    setLoading(false);
  };

  return (
    <Container fluid className="reports-container py-4">
      <h1 className="mb-4">📊 Reports & Analytics</h1>

      {/* Report Settings */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Report Settings</h5>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Report Type</Form.Label>
                <Form.Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  min={2020}
                  max={2099}
                />
              </Form.Group>
            </Col>
            {reportType === 'monthly' && (
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Month</Form.Label>
                  <Form.Select
                    value={month}
                    onChange={(e) => setMonth(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                      <option key={m} value={m}>
                        {new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
            <Col md={3} className="d-flex align-items-end">
              <Button
                variant="primary"
                onClick={handleGenerateReport}
                disabled={loading}
                className="w-100"
              >
                {loading ? 'Generating...' : 'Generate Report'}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Report Data */}
      {reportData && (
        <>
          {/* Summary Cards */}
          <Row className="mb-4">
            <Col md={3} className="mb-3">
              <Card className="summary-card income">
                <Card.Body>
                  <h6>Total Income</h6>
                  <h3>₹ {reportData.totalIncome?.toFixed(2) || reportData.income?.toFixed(2)}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="summary-card expense">
                <Card.Body>
                  <h6>Total Expense</h6>
                  <h3>₹ {reportData.totalExpense?.toFixed(2) || reportData.expense?.toFixed(2)}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="summary-card savings">
                <Card.Body>
                  <h6>Total Savings</h6>
                  <h3>₹ {reportData.totalSavings?.toFixed(2) || reportData.savings?.toFixed(2)}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="summary-card ratio">
                <Card.Body>
                  <h6>Savings Ratio</h6>
                  <h3>
                    {((((reportData.totalSavings || reportData.savings) / (reportData.totalIncome || reportData.income)) * 100) || 0).toFixed(1)}%
                  </h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          {reportType === 'yearly' && reportData.chartData && (
            <Row className="mb-4">
              <Col lg={6} className="mb-3">
                <Card>
                  <Card.Body>
                    <h5>Income vs Expense (Monthly)</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={reportData.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₹${value}`} />
                        <Legend />
                        <Bar dataKey="income" fill="#28a745" />
                        <Bar dataKey="expense" fill="#dc3545" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6} className="mb-3">
                <Card>
                  <Card.Body>
                    <h5>Savings Trend</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={reportData.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₹${value}`} />
                        <Legend />
                        <Line type="monotone" dataKey="savings" stroke="#007bff" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {/* Category Breakdown (Monthly) */}
          {reportType === 'monthly' && reportData.categoryExpense && (
            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    <h5>Category Breakdown</h5>
                  </Card.Header>
                  <Card.Body>
                    {Object.keys(reportData.categoryExpense).length > 0 ? (
                      <div>
                        {Object.keys(reportData.categoryExpense).map(category => (
                          <div key={category} className="category-item">
                            <span>{category}</span>
                            <span className="amount">₹ {reportData.categoryExpense[category].toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No expense data</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default Reports;

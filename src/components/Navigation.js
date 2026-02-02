import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavbarText } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" expand="lg" sticky="top" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand href="/dashboard" className="brand">
          💰 Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">  
          <NavbarText className='me-auto d-flex align-items-center'>
            <h4 className='text-warning my-auto'>Welcome, {user ? user.name : 'Guest'}!</h4>
          </NavbarText>        
          <Nav className="ms-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/transactions">Transactions</Nav.Link>
            <Nav.Link href="/reports">Reports</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

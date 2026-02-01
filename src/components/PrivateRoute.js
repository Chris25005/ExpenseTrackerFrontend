import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token, user } = useContext(AuthContext);

  return token && user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

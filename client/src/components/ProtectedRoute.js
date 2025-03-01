import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, isAuthenticated, isTokenExpired } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  if (!isAuthenticated() || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;


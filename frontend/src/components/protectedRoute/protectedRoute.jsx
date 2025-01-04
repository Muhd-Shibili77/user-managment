import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


const ProtectedRoute = ({ element, requiredRole }) => {
  const token = sessionStorage.getItem('token'); 

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwt_decode(token);
    const userRole = decodedToken?.role;
    const expiryTime = decodedToken?.exp * 1000;

    if (Date.now() > expiryTime) {
      sessionStorage.removeItem('token');
      return <Navigate to="/" />;
    }

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/" />;
    }
  } catch (error) {
    sessionStorage.removeItem('token');
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
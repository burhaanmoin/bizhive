import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  // Get stored authentication data
  const userRole = localStorage.getItem('userRole');
  const userDetails = localStorage.getItem('userDetails');

  // Check if user is authenticated and authorized
  const isAuthenticated = userRole && userDetails;
  const isAuthorized = userRole === role;

  console.log('Auth Check:', { userRole, isAuthenticated, isAuthorized, requiredRole: role });

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'ADMIN') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (userRole === 'ENTERPRISE') {
      return <Navigate to="/msme-dashboard" replace />;
    } else {
      // Fallback to login if role is invalid
      return <Navigate to="/login" replace />;
    }
  }

  // Render the protected component if authenticated and authorized
  return children;
};

export default PrivateRoute; 
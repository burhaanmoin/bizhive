import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Splash from './components/Splash';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import './App.css';
import theme from './theme';
import AdminDashboard from './components/AdminDashboard';
import MsmeDashboard from './components/MsmeDashboard';
import PrivateRoute from './components/PrivateRoute'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route
            path="/admin-dashboard/*"
            element={
              <PrivateRoute role="ADMIN">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/msme-dashboard/*"
            element={
              <PrivateRoute role="ENTERPRISE">
                <MsmeDashboard />
              </PrivateRoute>
            }
          />

          {/* Redirect root to splash */}
          <Route path="/" element={<Navigate to="/splash" replace />} />
          
          {/* Catch all route for 404 */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

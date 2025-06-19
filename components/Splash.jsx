import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import '../styles/Splash.scss';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after animation (3 seconds)
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box className="splash-container">
      <div className="splash-content">
        <Typography variant="h1" className="splash-title">
          <span className="biz">Biz</span>
          <span className="hive">HIVE</span>
        </Typography>
        <Typography variant="subtitle1" className="splash-subtitle">
          Empowering MSMEs
        </Typography>
      </div>
    </Box>
  );
};

export default Splash; 
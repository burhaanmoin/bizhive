import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Business,
  PersonAdd
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.scss';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Information (Aadhaar Details)
    fullName: '',
    loginId: '',
    email: '',
    password: '',
    phoneNumber: '',
    aadhaarNumber: '',
    panNumber: '',

    // Enterprise Information
    enterpriseName: '',
    enterpriseType: '',
    businessActivity: '',
    gstin: '',
    establishmentYear: '',

    // Address Information
    streetAddress: '',
    city: '',
    state: '',
    pincode: '',

    // Document Uploads
    addressProof: null,
    identityProof: null,
    businessTransactionProof: null,
    machineryProof: null,
    licensesProof: null,
    partnershipDeed: null
  });

  const enterpriseTypes = [
    'Micro Enterprise',
    'Small Enterprise',
    'Medium Enterprise'
  ];

  const currentYear = new Date().getFullYear();
  const yearRange = Array.from(
    { length: currentYear - 1900 + 1 }, 
    (_, index) => currentYear - index
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.data.success) {
        navigate('/login');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  return (
    <div className="signup-container">
      <Paper className="signup-paper" elevation={3}>
        <Box component="form" onSubmit={handleSubmit} className="signup-form">
          <div className="signup-header">
            <Business className="signup-icon" />
            <Typography variant="h4" className="signup-title">
              Enterprise Registration
            </Typography>
            <Typography variant="subtitle1" className="signup-subtitle">
              Register your MSME with BizHIVE
            </Typography>
          </div>

          {error && (
            <Alert severity="error" className="error-alert">
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            {/* Identification Section */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                Identification Details (as per Aadhaar)
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="signup-input"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Aadhaar Number"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                className="signup-input"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="PAN Number"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className="signup-input"
              />
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                Contact Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="signup-input"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="signup-input"
              />
            </Grid>

            {/* Business Details */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                Business Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Enterprise Name"
                name="enterpriseName"
                value={formData.enterpriseName}
                onChange={handleChange}
                className="signup-input"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Enterprise Type"
                name="enterpriseType"
                value={formData.enterpriseType}
                onChange={handleChange}
                className="signup-input"
              >
                {enterpriseTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={2}
                label="Business Activity"
                name="businessActivity"
                value={formData.businessActivity}
                onChange={handleChange}
                className="signup-input"
              />
            </Grid>

            {/* Document Uploads */}
            <Grid item xs={12}>
              <Typography variant="h6" className="section-title">
                Required Documents
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="file"
                label="Address Proof"
                name="addressProof"
                onChange={handleFileChange}
                className="signup-input"
                InputLabelProps={{ shrink: true }}
                helperText="Bank statement/Property tax receipt"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="file"
                label="Identity Proof"
                name="identityProof"
                onChange={handleFileChange}
                className="signup-input"
                InputLabelProps={{ shrink: true }}
                helperText="PAN Card"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="file"
                label="Business Transaction Proof"
                name="businessTransactionProof"
                onChange={handleFileChange}
                className="signup-input"
                InputLabelProps={{ shrink: true }}
                helperText="Sale bills/Purchase bills"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="file"
                label="Machinery & Licenses"
                name="machineryProof"
                onChange={handleFileChange}
                className="signup-input"
                InputLabelProps={{ shrink: true }}
                helperText="Industrial license/Machinery bills"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="file"
                label="Partnership Documents"
                name="partnershipDeed"
                onChange={handleFileChange}
                className="signup-input"
                InputLabelProps={{ shrink: true }}
                helperText="MOA/AOA (if applicable)"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="signup-button"
            disabled={loading}
            startIcon={<PersonAdd />}
          >
            {loading ? 'Registering...' : 'Register Enterprise'}
          </Button>

          <Button
            onClick={() => navigate('/login')}
            className="login-link"
          >
            Already registered? Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Signup; 
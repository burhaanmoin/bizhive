import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Paper,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Badge,
  LinearProgress,
  Card,
  CardContent,
  Chip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Switch,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Snackbar,
  Alert,
  Popover,
  ListItemAvatar,
  MUIList,
  MUIDivider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Description as DocumentIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  Notifications as NotificationIcon,
  CloudUpload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp,
  AccountBalance,
  AttachMoney,
  Group,
  LocationOn,
  WhatsApp,
  School,
  Assignment,
  LocalShipping,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import '../styles/msme-dashboard.scss';
import defaultCompanyLogo from '../assets/business_bg.jpg'; // Add a default company logo
import defaultAvatar from '../assets/business_bg.jpg'; // Add a default user avatar
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  getEnterpriseById,
  getEnterpriseDocuments,
  getEnterpriseReports,
  uploadEnterpriseDocument,
  uploadEnterpriseReport,
  deleteEnterpriseDocument,
  deleteEnterpriseReport,
  updateEnterprise,
} from '../services/api';

// Add this after imports to fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const drawerWidth = 220;

const MsmeDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessType: '',
    employees: '',
    turnover: ''
  });
  const [matchedSchemes, setMatchedSchemes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [avatarError, setAvatarError] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [currentSection, setCurrentSection] = useState('overview');
  const [enterprise, setEnterprise] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Dialog state
  const [docDialogOpen, setDocDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [docForm, setDocForm] = useState({ name: '', file: null, status: 'verified' });
  const [reportForm, setReportForm] = useState({ title: '', period: '', revenue: '', orders: '', growth: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);

  const recentDocuments = [
    { name: 'MSME Certificate', status: 'verified', date: '2024-02-15' },
    { name: 'GST Registration', status: 'pending', date: '2024-02-14' },
    { name: 'Annual Return', status: 'action_required', date: '2024-02-10' },
  ];

  const upcomingDeadlines = [
    { title: 'GST Filing', date: '2024-03-20', priority: 'high' },
    { title: 'Annual Compliance', date: '2024-04-15', priority: 'medium' },
    { title: 'License Renewal', date: '2024-05-01', priority: 'low' },
  ];

  const quickStats = [
    {
      title: 'Compliance Score',
      value: '98%',
      icon: <CheckCircleIcon />,
      trend: '+3%',
      color: '#4CAF50'
    },
    {
      title: 'Documents Verified',
      value: '12/15',
      icon: <DocumentIcon />,
      trend: '80%',
      color: '#2196F3'
    },
    {
      title: 'Scheme Benefits',
      value: '₹2.4L',
      icon: <AccountBalance />,
      trend: '+₹50K',
      color: '#FF9800'
    },
    {
      title: 'Credit Score',
      value: '750',
      icon: <TrendingUp />,
      trend: '+15',
      color: '#9C27B0'
    }
  ];

  const businessMetrics = [
    {
      title: 'Monthly Revenue',
      value: '₹4.2L',
      change: '+12%',
      icon: <TrendingUp />,
      color: '#2196f3'
    },
    {
      title: 'Active Orders',
      value: '28',
      change: '+5',
      icon: <Assignment />,
      color: '#4caf50'
    },
    {
      title: 'Raw Materials',
      value: '85%',
      change: '-2%',
      icon: <LocalShipping />,
      color: '#ff9800'
    }
  ];

  const schemes = [
    {
      name: 'CMEGP Loan',
      eligibility: { businessType: 'manufacturing', employees: '<5', turnover: '<50L' },
      benefit: 'Up to ₹25L with 25% subsidy',
      status: 'active'
    },
    {
      name: 'TANSIDCO Support',
      eligibility: { businessType: 'manufacturing', employees: '5-20', turnover: '50L-2Cr' },
      benefit: 'Up to ₹2Cr infrastructure support',
      status: 'active'
    },
    // Add more schemes...
  ];

  const supplierLocations = [
    { 
      lat: 13.0825, 
      lng: 80.2750, 
      type: 'Plastic Moulders', 
      name: 'Ambattur Cluster',
      area: 'Ambattur Industrial Estate',
      distance: '12 km'
    },
    { 
      lat: 13.0650, 
      lng: 80.2480, 
      type: 'Textile Weavers', 
      name: 'Guindy Estate'
    },
    // Add more locations...
  ];

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    // Match schemes based on form data
    const matched = schemes.filter(scheme => {
      return Object.keys(scheme.eligibility).every(key => 
        !formData[key] || scheme.eligibility[key] === formData[key]
      );
    });
    setMatchedSchemes(matched);
  }, [formData]);

  // Fetch all data on mount
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [ent, docs, reps] = await Promise.all([
          getEnterpriseById(1),
          getEnterpriseDocuments(1),
          getEnterpriseReports(1)
        ]);
        setEnterprise(ent);
        setDocuments(docs);
        setReports(reps);
      } catch (e) {
        setError('Failed to load enterprise data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleSectionClick = (section) => {
    setCurrentSection(section);
    navigate(`/msme-dashboard/${section.toLowerCase()}`);
  };

  // Handlers for dialogs
  const handleDocDialogOpen = () => setDocDialogOpen(true);
  const handleDocDialogClose = () => setDocDialogOpen(false);
  const handleReportDialogOpen = () => setReportDialogOpen(true);
  const handleReportDialogClose = () => setReportDialogOpen(false);

  const handleDocFormChange = (field, value) => {
    setDocForm(prev => ({ ...prev, [field]: value }));
  };
  const handleReportFormChange = (field, value) => {
    setReportForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDocSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', docForm.file);
      formData.append('name', docForm.name);
      formData.append('status', docForm.status);
      await uploadEnterpriseDocument(1, formData); // Assuming enterprise id 1
      setSnackbar({ open: true, message: 'Document uploaded!', severity: 'success' });
      setDocDialogOpen(false);
      setDocForm({ name: '', file: null, status: 'verified' });
      // Refresh documents
      const docs = await getEnterpriseDocuments(1);
      setDocuments(docs);
    } catch (e) {
      setSnackbar({ open: true, message: 'Failed to upload document', severity: 'error' });
    }
  };

  const handleReportSubmit = async () => {
    try {
      await uploadEnterpriseReport(1, reportForm); // Assuming enterprise id 1
      setSnackbar({ open: true, message: 'Report generated!', severity: 'success' });
      setReportDialogOpen(false);
      setReportForm({ title: '', period: '', revenue: '', orders: '', growth: '' });
      // Refresh reports
      const reps = await getEnterpriseReports(1);
      setReports(reps);
    } catch (e) {
      setSnackbar({ open: true, message: 'Failed to generate report', severity: 'error' });
    }
  };

  const handleNotifOpen = () => setNotifOpen(true);
  const handleNotifClose = () => setNotifOpen(false);

  return (
    <Box className="msme-dashboard">
      <AppBar position="fixed" className="app-bar" sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        transition: 'width 0.3s, margin 0.3s',
        zIndex: 1201
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" className="title">
            BizHIVE Dashboard
          </Typography>
          <div className="toolbar-right" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <IconButton color="inherit" onClick={handleNotifOpen} sx={{ mr: 1 }}>
              <Badge badgeContent={notifications.length} color="error">
                <NotificationIcon />
              </Badge>
            </IconButton>
            <Popover
              open={notifOpen}
              anchorEl={notifAnchorEl}
              onClose={handleNotifClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{ sx: { minWidth: 320, maxWidth: 400, p: 1 } }}
            >
              <Typography variant="subtitle1" sx={{ px: 2, pt: 1, fontWeight: 700 }}>Notifications</Typography>
              <MUIList dense>
                {notifications.length === 0 && (
                  <MUIListItem>
                    <ListItemText primary="No new notifications" />
                  </MUIListItem>
                )}
                {notifications.map((notif, idx) => (
                  <React.Fragment key={notif.id}>
                    <MUIListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: notif.type === 'success' ? '#4caf50' : notif.type === 'warning' ? '#ff9800' : '#2196f3', width: 32, height: 32 }}>
                          <NotificationIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<span style={{ fontWeight: 600 }}>{notif.title}</span>}
                        secondary={<>
                          <Typography component="span" variant="body2" color="text.secondary">{notif.desc}</Typography>
                          <br />
                          <Typography component="span" variant="caption" color="text.secondary">{notif.time}</Typography>
                        </>}
                      />
                    </MUIListItem>
                    {idx < notifications.length - 1 && <MUIDivider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </MUIList>
            </Popover>
            <Button 
              color="inherit" 
              className="profile-button"
              startIcon={
                <Avatar 
                  src={avatarError ? undefined : defaultAvatar}
                  className="avatar"
                >
                  {enterprise?.enterpriseName ? enterprise.enterpriseName[0] : 'E'}
                </Avatar>
              }
              sx={{ textTransform: 'none', fontWeight: 600, fontSize: '1rem', ml: 1 }}
            >
              {enterprise?.enterpriseName || 'Enterprise'}
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className="drawer"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            boxSizing: 'border-box',
            zIndex: 1200
          }
        }}
      >
        <div className="drawer-header">
          <Box className="sidebar-logo" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', px: 1 }}>
            <img src="/favicon.ico" alt="BizHIVE" style={{ width: 32, height: 32, marginRight: 12 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>BizHIVE</Typography>
          </Box>
        </div>
        <Divider />
        <List className="drawer-list">
          <ListItem 
            button 
            selected={currentSection === 'overview'}
            onClick={() => handleSectionClick('overview')}
          >
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItem>
          <ListItem 
            button
            selected={currentSection === 'profile'}
            onClick={() => handleSectionClick('profile')}
          >
            <ListItemIcon><BusinessIcon /></ListItemIcon>
            <ListItemText primary="Enterprise Profile" />
          </ListItem>
          <ListItem 
            button
            selected={currentSection === 'documents'}
            onClick={() => handleSectionClick('documents')}
          >
            <ListItemIcon><DocumentIcon /></ListItemIcon>
            <ListItemText primary="Documents" />
          </ListItem>
          <ListItem 
            button
            selected={currentSection === 'reports'}
            onClick={() => handleSectionClick('reports')}
          >
            <ListItemIcon><ReportIcon /></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem 
            button
            selected={currentSection === 'settings'}
            onClick={() => handleSectionClick('settings')}
          >
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <div className="drawer-footer">
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </div>
      </Drawer>

      <Box component="main" className="content" sx={{
        transition: 'margin 0.3s',
        ml: { sm: `${drawerWidth}px` },
        width: { sm: `calc(100% - ${drawerWidth}px)` }
      }}>
        <Container maxWidth="lg" className="dashboard-container">
          <Routes>
            <Route path="/" element={<Navigate to="overview" replace />} />
            <Route path="/overview" element={
              <>
                {/* Business Profile (move to top) */}
                <Paper className="profile-section">
                  <div className="profile-header">
                    <div className="profile-info">
                      <Avatar 
                        src={avatarError ? undefined : defaultCompanyLogo}
                        className="company-avatar"
                        onError={() => setAvatarError(true)}
                      >
                        <BusinessIcon />
                      </Avatar>
                      <div className="company-details">
                        <Typography variant="h5">{enterprise?.enterpriseName || 'N/A'}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          MSME Reg. No: {enterprise?.msmeRegNo || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          MSME Registration: {enterprise?.loginId || 'N/A'}
                        </Typography>
                      </div>
                    </div>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      startIcon={<BusinessIcon />}
                      onClick={() => {
                        navigate('/msme-dashboard/profile');
                      }}
                    >
                      Edit Profile
                    </Button>
                  </div>
                  <Divider className="profile-divider" />
                  <Grid container spacing={3} className="profile-stats">
                    <Grid item xs={12} sm={6} md={3}>
                      <div className="stat-item">
                        <Group className="stat-icon" />
                        <Typography variant="h6">{enterprise?.employeeCount ?? 'N/A'}</Typography>
                        <Typography variant="body2">Employees</Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <div className="stat-item">
                        <AttachMoney className="stat-icon" />
                        <Typography variant="h6">{enterprise?.annualTurnover || 'N/A'}</Typography>
                        <Typography variant="body2">Annual Turnover</Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <div className="stat-item">
                        <LocationOn className="stat-icon" />
                        <Typography variant="h6">{enterprise?.city || 'N/A'}</Typography>
                        <Typography variant="body2">Location</Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <div className="stat-item">
                        <BusinessIcon className="stat-icon" />
                        <Typography variant="h6">{enterprise?.typeOfBusiness || 'N/A'}</Typography>
                        <Typography variant="body2">Sector</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
                {/* Scheme Matchmaker Section */}
                <Grid container spacing={3} className="section-grid">
                  <Grid item xs={12} md={6}>
                    <Paper className="scheme-matcher">
                      <Typography variant="h6" className="section-title">
                        Scheme Eligibility Checker
                      </Typography>
                      <form className="eligibility-form">
                        <FormControl component="fieldset" className="form-field">
                          <Typography variant="subtitle2">Business Type</Typography>
                          <RadioGroup
                            row
                            value={formData.businessType}
                            onChange={(e) => handleFormChange('businessType', e.target.value)}
                          >
                            <FormControlLabel value="manufacturing" control={<Radio />} label="Manufacturing" />
                            <FormControlLabel value="service" control={<Radio />} label="Service" />
                          </RadioGroup>
                        </FormControl>

                        <FormControl fullWidth className="form-field">
                          <Typography variant="subtitle2">Number of Employees</Typography>
                          <Select
                            value={formData.employees}
                            onChange={(e) => handleFormChange('employees', e.target.value)}
                          >
                            <MenuItem value="<5">Less than 5</MenuItem>
                            <MenuItem value="5-20">5 - 20</MenuItem>
                            <MenuItem value="20+">More than 20</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth className="form-field">
                          <Typography variant="subtitle2">Annual Turnover</Typography>
                          <Select
                            value={formData.turnover}
                            onChange={(e) => handleFormChange('turnover', e.target.value)}
                          >
                            <MenuItem value="<50L">Less than 50 Lakhs</MenuItem>
                            <MenuItem value="50L-2Cr">50 Lakhs - 2 Crore</MenuItem>
                            <MenuItem value="2Cr+">More than 2 Crore</MenuItem>
                          </Select>
                        </FormControl>
                      </form>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper className="matched-schemes">
                      <Typography variant="h6" className="section-title">
                        Matched Schemes
                      </Typography>
                      <div className="schemes-list">
                        {matchedSchemes.map((scheme, index) => (
                          <Card key={index} className="scheme-card">
                            <CardContent>
                              <div className="scheme-header">
                                <Typography variant="h6">{scheme.name}</Typography>
                                <Chip 
                                  label={scheme.status} 
                                  color={scheme.status === 'active' ? 'success' : 'warning'}
                                  size="small" 
                                />
                              </div>
                              <Typography variant="body2" color="textSecondary">
                                {scheme.benefit}
                              </Typography>
                              <Button 
                                variant="contained" 
                                color="primary"
                                className="apply-button"
                                endIcon={<CheckCircleIcon />}
                              >
                                Apply Now
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Supplier Network Section */}
                <Paper className="supplier-network">
                  <div className="section-header">
                    <Typography variant="h6" className="section-title">
                      Chennai Supplier Network
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<LocationOn />}
                      onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                    >
                      {viewMode === 'map' ? 'View List' : 'View Map'}
                    </Button>
                  </div>
                  
                  {viewMode === 'map' ? (
                    <div className="map-container">
                      <MapContainer 
                        center={[13.0827, 80.2707]} 
                        zoom={11} 
                        style={{ height: '100%', width: '100%' }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {supplierLocations.map((location, index) => (
                          <Marker 
                            key={index} 
                            position={[location.lat, location.lng]}
                          >
                            <Popup>
                              <div className="map-popup">
                                <Typography variant="subtitle1">{location.name}</Typography>
                                <Typography variant="body2">{location.type}</Typography>
                                <Button 
                                  size="small"
                                  startIcon={<LocationOn />}
                                  onClick={() => window.open(
                                    `https://www.openstreetmap.org/directions?from=&to=${location.lat},${location.lng}`,
                                    '_blank'
                                  )}
                                >
                                  Get Directions
                                </Button>
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    </div>
                  ) : (
                    <Grid container spacing={3} className="supplier-grid">
                      {supplierLocations.map((location, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Card className="supplier-card">
                            <CardContent>
                              <div className="supplier-header">
                                <Typography variant="h6">{location.name}</Typography>
                                <Chip 
                                  icon={<LocationOn />}
                                  label={location.type}
                                  size="small"
                                  className="type-chip"
                                />
                              </div>
                              <div className="supplier-details">
                                <Typography variant="body2" color="textSecondary">
                                  Location: {location.area || 'Chennai'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  Distance: {location.distance || '5 km'}
                                </Typography>
                              </div>
                              <div className="supplier-actions">
                                <Button 
                                  variant="outlined"
                                  size="small"
                                  startIcon={<WhatsApp />}
                                  className="contact-btn"
                                >
                                  Contact
                                </Button>
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<LocationOn />}
                                  className="direction-btn"
                                  onClick={() => window.open(
                                    `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
                                    '_blank'
                                  )}
                                >
                                  Get Directions
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Paper>

                {/* Quick Access Tools */}
                <Grid container spacing={3} className="tools-grid">
                  <Grid item xs={12} md={4}>
                    <Paper className="tool-card whatsapp-toolkit">
                      <WhatsApp className="tool-icon" />
                      <Typography variant="h6">WhatsApp Business Toolkit</Typography>
                      <Button variant="contained" color="primary">
                        Download Templates
                      </Button>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Paper className="tool-card material-exchange">
                      <LocalShipping className="tool-icon" />
                      <Typography variant="h6">Raw Material Exchange</Typography>
                      <Button variant="contained" color="primary">
                        View Listings
                      </Button>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Paper className="tool-card skill-courses">
                      <School className="tool-icon" />
                      <Typography variant="h6">Skill Boosters</Typography>
                      <Button variant="contained" color="primary">
                        Access Courses
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Quick Stats */}
                <Grid container spacing={3} className="metrics-grid">
                  {businessMetrics.map((metric, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Paper className="metric-card" style={{ '--metric-color': metric.color }}>
                        <div className="metric-content">
                          <div className="metric-header">
                            <Typography variant="h6">{metric.title}</Typography>
                            {metric.icon}
                          </div>
                          <Typography variant="h4" className="metric-value">
                            {metric.value}
                          </Typography>
                          <Chip 
                            label={metric.change}
                            size="small"
                            className={`trend-chip ${metric.change.startsWith('+') ? 'positive' : 'negative'}`}
                          />
                        </div>
                        <LinearProgress 
                          variant="determinate" 
                          value={75} 
                          className="metric-progress"
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </>
            } />
            <Route path="/profile" element={<EnterpriseProfile enterprise={enterprise} setEnterprise={setEnterprise} loading={loading} error={error} />} />
            <Route path="/documents" element={<Documents loading={loading} error={error} documents={documents} handleDocDialogOpen={handleDocDialogOpen} />} />
            <Route path="/reports" element={<Reports loading={loading} error={error} reports={reports} handleReportDialogOpen={handleReportDialogOpen} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Container>
      </Box>
      <Dialog open={docDialogOpen} onClose={handleDocDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <TextField
            label="Document Name"
            value={docForm.name}
            onChange={e => handleDocFormChange('name', e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={docForm.status}
              label="Status"
              onChange={e => handleDocFormChange('status', e.target.value)}
            >
              <MenuItem value="verified">Verified</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="action_required">Action Required</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={e => handleDocFormChange('file', e.target.files[0])}
            />
          </Button>
          {docForm.file && <Typography sx={{ mt: 1 }}>Selected: {docForm.file.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDocDialogClose}>Cancel</Button>
          <Button onClick={handleDocSubmit} variant="contained" disabled={!docForm.name || !docForm.file}>Upload</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={reportDialogOpen} onClose={handleReportDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Generate Report</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={reportForm.title}
            onChange={e => handleReportFormChange('title', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Period"
            value={reportForm.period}
            onChange={e => handleReportFormChange('period', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Revenue"
            value={reportForm.revenue}
            onChange={e => handleReportFormChange('revenue', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Orders"
            value={reportForm.orders}
            onChange={e => handleReportFormChange('orders', e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Growth"
            value={reportForm.growth}
            onChange={e => handleReportFormChange('growth', e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReportDialogClose}>Cancel</Button>
          <Button onClick={handleReportSubmit} variant="contained" disabled={!reportForm.title || !reportForm.period || !reportForm.revenue || !reportForm.orders || !reportForm.growth}>Generate</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const EnterpriseProfile = ({ enterprise, setEnterprise, loading, error }) => {
  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(null);

  const handleEditProfile = () => {
    setProfileForm({ ...enterprise });
    setEditProfile(true);
  };

  const handleProfileCancel = () => {
    setProfileForm(null);
    setEditProfile(false);
  };

  const handleProfileChange = (field, value) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileSave = async () => {
    if (!profileForm) return;
    setEditProfile(false);
    setProfileForm(null);
    try {
      await updateEnterprise(profileForm.id, profileForm);
      setEnterprise(profileForm);
    } catch (e) {
      // Optionally handle error
    }
  };

  if (loading) return <Paper className="enterprise-profile"><Typography>Loading...</Typography></Paper>;
  if (error) return <Paper className="enterprise-profile"><Typography color="error">{error}</Typography></Paper>;
  if (!enterprise) return (
    <Paper className="enterprise-profile">
      <Typography>No enterprise profile found.</Typography>
      <Button variant="contained" color="primary">Fill Profile</Button>
    </Paper>
  );
  const isEdit = editProfile;
  if (isEdit && !profileForm) return null;
  const data = isEdit ? profileForm : enterprise;
  return (
    <Paper className="enterprise-profile">
                  <div className="profile-header">
        <div className="company-info">
                      <Avatar 
            src={defaultCompanyLogo}
            className="company-logo"
            variant="rounded"
                      >
                        <BusinessIcon />
                      </Avatar>
                      <div className="company-details">
            {isEdit ? (
              <TextField
                label="Enterprise Name"
                value={data.enterpriseName || ''}
                onChange={e => handleProfileChange('enterpriseName', e.target.value)}
                size="small"
                fullWidth
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography variant="h5" className="company-name">
                {data.enterpriseName || 'N/A'}
                        </Typography>
            )}
            {isEdit ? (
              <TextField
                label="MSME Reg. No"
                value={data.msmeRegNo || ''}
                onChange={e => handleProfileChange('msmeRegNo', e.target.value)}
                size="small"
                fullWidth
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography className="registration-number">
                MSME Reg. No: {data.msmeRegNo || 'N/A'}
              </Typography>
            )}
            {/* MSME Registration (loginId) below enterprise name */}
            {isEdit ? (
              <TextField
                label="MSME Registration/Login Id"
                value={data.loginId || ''}
                onChange={e => handleProfileChange('loginId', e.target.value)}
                size="small"
                fullWidth
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography className="registration-number">
                MSME Registration: {data.loginId || 'N/A'}
              </Typography>
            )}
                      </div>
                    </div>
        {isEdit ? (
          <>
            <Button color="primary" variant="contained" onClick={handleProfileSave} sx={{ mr: 1 }}>Save</Button>
            <Button color="secondary" variant="outlined" onClick={handleProfileCancel}>Cancel</Button>
          </>
        ) : (
          <Button startIcon={<EditIcon />} className="edit-button" onClick={handleEditProfile}>
                      Edit Profile
                    </Button>
        )}
                  </div>
      <Grid container spacing={3} className="profile-sections">
        <Grid item xs={12} md={6}>
          <Paper className="section-card">
            <Typography variant="h6" className="section-title">
              <BusinessIcon className="section-icon" />
              Business Details
            </Typography>
            <div className="info-list">
              <div className="info-item">
                <Typography className="label">Type of Business</Typography>
                {isEdit ? (
                  <TextField
                    value={data.typeOfBusiness || ''}
                    onChange={e => handleProfileChange('typeOfBusiness', e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <Typography className="value">{data.typeOfBusiness || 'N/A'}</Typography>
                )}
                      </div>
              <div className="info-item">
                <Typography className="label">Established Year</Typography>
                {isEdit ? (
                  <TextField
                    value={data.establishmentYear || ''}
                    onChange={e => handleProfileChange('establishmentYear', e.target.value)}
                    size="small"
                    fullWidth
                    type="number"
                  />
                ) : (
                  <Typography className="value">{data.establishmentYear || 'N/A'}</Typography>
                )}
              </div>
              <div className="info-item">
                <Typography className="label">Employee Count</Typography>
                {isEdit ? (
                  <TextField
                    value={data.employeeCount || ''}
                    onChange={e => handleProfileChange('employeeCount', e.target.value)}
                    size="small"
                    fullWidth
                    type="number"
                  />
                ) : (
                  <Typography className="value">{data.employeeCount || 'N/A'}</Typography>
                )}
              </div>
              <div className="info-item">
                <Typography className="label">Annual Turnover</Typography>
                {isEdit ? (
                  <TextField
                    value={data.annualTurnover || ''}
                    onChange={e => handleProfileChange('annualTurnover', e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <Typography className="value">{data.annualTurnover || 'N/A'}</Typography>
                )}
              </div>
            </div>
          </Paper>
                    </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="section-card">
            <Typography variant="h6" className="section-title">
              <LocationOn className="section-icon" />
              Location Details
            </Typography>
            <div className="info-list">
              <div className="info-item">
                <Typography className="label">Registered Address</Typography>
                {isEdit ? (
                  <TextField
                    value={data.registeredAddress || ''}
                    onChange={e => handleProfileChange('registeredAddress', e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <Typography className="value">{data.registeredAddress || 'N/A'}</Typography>
                )}
                      </div>
              <div className="info-item">
                <Typography className="label">Factory Location</Typography>
                {isEdit ? (
                  <TextField
                    value={data.factoryLocation || ''}
                    onChange={e => handleProfileChange('factoryLocation', e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <Typography className="value">{data.factoryLocation || 'N/A'}</Typography>
                )}
              </div>
              <div className="info-item">
                <Typography className="label">Branch Offices</Typography>
                {isEdit ? (
                  <TextField
                    value={data.branchOffices || ''}
                    onChange={e => handleProfileChange('branchOffices', e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <Typography className="value">{data.branchOffices || 'N/A'}</Typography>
                )}
              </div>
            </div>
          </Paper>
                    </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="section-card">
            <Typography variant="h6" className="section-title">
              <Assignment className="section-icon" />
              Compliance Status
            </Typography>
            <div className="info-list">
              <div className="info-item">
                <Typography className="label">MSME Registration</Typography>
                {isEdit ? (
                  <TextField
                    value={data.msmeRegistrationStatus || ''}
                    onChange={e => handleProfileChange('msmeRegistrationStatus', e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <Chip label={data.msmeRegistrationStatus || 'N/A'} color="success" size="small" />
                )}
                      </div>
              <div className="info-item">
                <Typography className="label">GST Status</Typography>
                {isEdit ? (
                  <TextField
                    value={data.gstStatus || ''}
                    onChange={e => handleProfileChange('gstStatus', e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <Chip label={data.gstStatus || 'N/A'} color="success" size="small" />
                )}
              </div>
              <div className="info-item">
                <Typography className="label">Factory License</Typography>
                {isEdit ? (
                  <TextField
                    value={data.factoryLicenseStatus || ''}
                    onChange={e => handleProfileChange('factoryLicenseStatus', e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <Chip label={data.factoryLicenseStatus || 'N/A'} color="warning" size="small" />
                )}
              </div>
            </div>
          </Paper>
                    </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="section-card">
            <Typography variant="h6" className="section-title">
              <Group className="section-icon" />
              Contact Information
            </Typography>
            <div className="info-list">
              <div className="info-item">
                <Typography className="label">Primary Contact</Typography>
                {isEdit ? (
                  <TextField
                    value={data.primaryContact || ''}
                    onChange={e => handleProfileChange('primaryContact', e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <Typography className="value">{data.primaryContact || 'N/A'}</Typography>
                )}
                      </div>
              <div className="info-item">
                <Typography className="label">Business Email</Typography>
                {isEdit ? (
                  <TextField
                    value={data.email || ''}
                    onChange={e => handleProfileChange('email', e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <Typography className="value">{data.email || 'N/A'}</Typography>
                )}
              </div>
              <div className="info-item">
                <Typography className="label">Phone Number</Typography>
                {isEdit ? (
                  <TextField
                    value={data.phoneNumber || ''}
                    onChange={e => handleProfileChange('phoneNumber', e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <Typography className="value">{data.phoneNumber || 'N/A'}</Typography>
                )}
              </div>
            </div>
          </Paper>
                    </Grid>
                  </Grid>
                </Paper>
  );
};

// Documents Section
const Documents = ({ loading, error, documents, handleDocDialogOpen }) => {
  if (loading) return <Paper className="documents-section"><Typography>Loading...</Typography></Paper>;
  if (error) return <Paper className="documents-section"><Typography color="error">{error}</Typography></Paper>;
  if (!documents || documents.length === 0) return (
    <Paper className="documents-section">
      <Typography>No documents found.</Typography>
      <Button startIcon={<UploadIcon />} variant="contained" color="primary" onClick={handleDocDialogOpen}>Upload Document</Button>
      <Grid container spacing={3} className="documents-grid" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="document-card">
            <DocumentIcon className="doc-icon" />
            <Typography variant="h6" className="doc-title">
              Example Document
            </Typography>
            <Typography className="doc-meta">
              Updated: 2024-01-01
            </Typography>
            <div className="doc-actions">
              <Chip label="verified" className="status-badge verified" />
              <IconButton disabled>
                <DownloadIcon />
              </IconButton>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
  return (
    <Paper className="documents-section">
      <div className="section-header">
        <Typography variant="h6" className="section-title">
          Documents
        </Typography>
        <Button startIcon={<UploadIcon />} variant="contained" color="primary" onClick={handleDocDialogOpen}>Upload New</Button>
      </div>
      <Grid container spacing={3} className="documents-grid">
        {documents.map((doc, index) => (
          <Grid item xs={12} sm={6} md={4} key={doc.id || index}>
            <Paper className="document-card">
              <DocumentIcon className="doc-icon" />
              <Typography variant="h6" className="doc-title">
                {doc.name}
              </Typography>
              <Typography className="doc-meta">
                Updated: {doc.lastUpdated ? new Date(doc.lastUpdated).toLocaleDateString() : 'N/A'}
              </Typography>
              <div className="doc-actions">
                <Chip 
                  label={doc.status} 
                  className={`status-badge ${doc.status}`}
                />
                <IconButton>
                  <DownloadIcon />
                </IconButton>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

// Reports Section
const Reports = ({ loading, error, reports, handleReportDialogOpen }) => {
  if (loading) return <Paper className="reports-section"><Typography>Loading...</Typography></Paper>;
  if (error) return <Paper className="reports-section"><Typography color="error">{error}</Typography></Paper>;
  if (!reports || reports.length === 0) return (
    <Paper className="reports-section">
      <Typography>No reports found.</Typography>
      <Button startIcon={<AddIcon />} variant="contained" color="primary" onClick={handleReportDialogOpen}>Generate Report</Button>
      <Grid container spacing={3} className="reports-grid" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="report-card">
            <div className="report-header">
              <Typography className="report-title">
                Example Report
              </Typography>
              <Typography className="report-period">
                Q1 2024
              </Typography>
            </div>
            <div className="report-stats">
              <div className="stat-row">
                <Typography className="stat-label">Revenue</Typography>
                <Typography className="stat-value">₹1,00,000</Typography>
              </div>
              <div className="stat-row">
                <Typography className="stat-label">Orders</Typography>
                <Typography className="stat-value">50</Typography>
              </div>
              <div className="stat-row">
                <Typography className="stat-label">Growth</Typography>
                <Typography className="stat-value">+10%</Typography>
              </div>
            </div>
            <div className="report-actions">
              <Button startIcon={<DownloadIcon />} className="download-btn" disabled>
                Download
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
  return (
    <Paper className="reports-section">
      <div className="section-header">
        <Typography variant="h6" className="section-title">
          Reports
        </Typography>
        <Button startIcon={<AddIcon />} variant="contained" color="primary" onClick={handleReportDialogOpen}>Generate Report</Button>
      </div>
      <Grid container spacing={3} className="reports-grid">
        {reports.map((report, index) => (
          <Grid item xs={12} sm={6} md={4} key={report.id || index}>
            <Paper className="report-card">
              <div className="report-header">
                <Typography className="report-title">
                  {report.title}
                </Typography>
                <Typography className="report-period">
                  {report.period}
                </Typography>
              </div>
              <div className="report-stats">
                <div className="stat-row">
                  <Typography className="stat-label">Revenue</Typography>
                  <Typography className="stat-value">{report.revenue}</Typography>
                </div>
                <div className="stat-row">
                  <Typography className="stat-label">Orders</Typography>
                  <Typography className="stat-value">{report.orders}</Typography>
                </div>
                <div className="stat-row">
                  <Typography className="stat-label">Growth</Typography>
                  <Typography className="stat-value">{report.growth}</Typography>
                </div>
              </div>
              <div className="report-actions">
                <Button
                  startIcon={<DownloadIcon />}
                  className="download-btn"
                >
                  Download
                </Button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

// Settings Section
const Settings = () => (
  <Paper className="settings-section">
    <Typography variant="h6" className="section-title">
      Settings
    </Typography>

    <Grid container spacing={3} className="settings-grid">
      <Grid item xs={12} md={6}>
        <Paper className="settings-card">
          <div className="settings-header">
            <Typography className="settings-title">
              Notifications
            </Typography>
            <Typography className="settings-description">
              Manage your notification preferences
            </Typography>
          </div>
          <div className="settings-form">
            <div className="form-group">
              <div className="form-control switch-control">
                <Typography className="switch-label">
                  Email Notifications
                </Typography>
                <Switch defaultChecked />
              </div>
            </div>
            {/* Add more settings controls */}
          </div>
        </Paper>
      </Grid>
      {/* Add more settings cards */}
    </Grid>
  </Paper>
);

export default MsmeDashboard; 
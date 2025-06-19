import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  IconButton,
  Fade,
  Collapse
} from '@mui/material';
import { 
  BusinessCenter, 
  TrendingUp, 
  Security, 
  Support, 
  ArrowForward,
  MonetizationOn,
  GroupWork,
  Assignment,
  Speed,
  CheckCircle,
  LocalShipping,
  AccountBalance,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.scss';

const Home = () => {
  const navigate = useNavigate();
  const [expandMsme, setExpandMsme] = useState(false);

  const features = [
    {
      icon: <BusinessCenter />,
      title: 'Simplified Registration',
      description: 'Complete your MSME registration in 3 simple steps with our guided process'
    },
    {
      icon: <MonetizationOn />,
      title: 'Financial Access',
      description: 'Get priority access to loans, subsidies, and government schemes'
    },
    {
      icon: <Security />,
      title: 'Data Security',
      description: 'Enterprise-grade security with end-to-end encryption'
    },
    {
      icon: <Support />,
      title: 'Dedicated Support',
      description: '24/7 expert assistance for all your business needs'
    }
  ];

  const benefits = [
    {
      title: 'Financial Advantages',
      description: 'Access collateral-free loans up to ₹2 Crore, interest subsidies, and reduced processing fees',
      icon: <MonetizationOn />,
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
      points: [
        'Collateral-free loans up to ₹2 Crore',
        '1-2% interest subsidy on bank loans',
        'Reduced bank processing charges',
        'Special tax benefits and exemptions'
      ]
    },
    {
      title: 'Government Support',
      description: 'Benefit from government policies, protection against delays, and preferential treatment',
      icon: <AccountBalance />,
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80',
      points: [
        'Protection against delayed payments',
        'Priority sector lending benefits',
        'Preference in government tenders',
        'Micro & Small Enterprise support'
      ]
    },
    {
      title: 'Business Growth',
      description: 'Accelerate your business growth with marketing assistance and technology upgradation',
      icon: <TrendingUp />,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      points: [
        'Marketing and promotion support',
        'Technology upgradation assistance',
        'Quality certification support',
        'Industrial infrastructure access'
      ]
    }
  ];

  const stats = [
    { 
      number: '6.3Cr+', 
      label: 'MSMEs in India',
      icon: <BusinessCenter />
    },
    { 
      number: '11Cr+', 
      label: 'Employment Generated',
      icon: <GroupWork />
    },
    { 
      number: '30%', 
      label: 'GDP Contribution',
      icon: <TrendingUp />
    },
    { 
      number: '45%', 
      label: 'Manufacturing Output',
      icon: <LocalShipping />
    }
  ];

  const successStories = [
    {
      image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=800&auto=format&fit=crop&q=80',
      title: 'Manufacturing Excellence',
      description: 'How a small manufacturing unit grew 300% in 2 years with MSME registration'
    },
    {
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=80',
      title: 'Digital Transformation',
      description: 'Local business reaches global markets through e-commerce enablement'
    },
    {
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=80',
      title: 'Innovation Leader',
      description: 'Tech startup scales operations with government scheme benefits'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <div>
                  <Typography variant="h1" className="hero-title">
                    Transform Your Business with BizHIVE
                  </Typography>
                  <Typography variant="h5" className="hero-subtitle">
                    Streamlined MSME Registration • Instant Access to Benefits • Dedicated Support
                  </Typography>
                  <Box className="hero-buttons">
                    <Button 
                      variant="contained" 
                      size="large"
                      onClick={() => navigate('/signup')}
                      className="get-started-btn"
                    >
                      Register Your Business
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="large"
                      onClick={() => navigate('/login')}
                      className="login-btn"
                    >
                      Sign In
                    </Button>
                  </Box>
                </div>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6} className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80"
                alt="MSME Growth" 
                className="hero-image"
              />
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Stats Section with Animation */}
      <section className="stats-section">
        <Container>
          <Grid container spacing={3} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                  <div className="stat-card">
                    <div className="stat-icon">{stat.icon}</div>
                    <Typography variant="h3" className="stat-number">
                      {stat.number}
                    </Typography>
                    <Typography variant="subtitle1" className="stat-label">
                      {stat.label}
                    </Typography>
                  </div>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* MSME Impact Section */}
      <section className="msme-impact-section">
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <div className="impact-content">
                <Typography variant="h2" className="impact-title">
                  Empowering India's Economic Backbone
                </Typography>
                <Typography variant="body1" className="impact-description">
                  Micro, Small, and Medium Enterprises (MSMEs) form the backbone of Indian economy, 
                  driving innovation, employment, and sustainable growth across sectors.
                </Typography>
                
                <div className="impact-points">
                  <div className="impact-point">
                    <BusinessCenter className="impact-icon" />
                    <div>
                      <Typography variant="h6">Economic Powerhouse</Typography>
                      <Typography variant="body2">
                        Contributing 30% to India's GDP and 45% to manufacturing output, 
                        MSMEs are crucial for economic development and self-reliance.
                      </Typography>
                    </div>
                  </div>

                  <div className="impact-point">
                    <GroupWork className="impact-icon" />
                    <div>
                      <Typography variant="h6">Employment Generator</Typography>
                      <Typography variant="body2">
                        Creating over 11 crore jobs, MSMEs are the second largest employer 
                        after agriculture, fostering entrepreneurship and skill development.
                      </Typography>
                    </div>
                  </div>

                  <div className="impact-point">
                    <TrendingUp className="impact-icon" />
                    <div>
                      <Typography variant="h6">Export Contribution</Typography>
                      <Typography variant="body2">
                        MSMEs account for 48% of India's exports, playing a vital role in 
                        foreign trade and establishing global market presence.
                      </Typography>
                    </div>
                  </div>

                  <div className="impact-point">
                    <Speed className="impact-icon" />
                    <div>
                      <Typography variant="h6">Innovation Driver</Typography>
                      <Typography variant="body2">
                        With over 6.3 crore enterprises, MSMEs drive technological innovation 
                        and regional development across urban and rural India.
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="impact-expand">
                  <Button 
                    className="expand-button"
                    onClick={() => setExpandMsme(!expandMsme)}
                    endIcon={expandMsme ? <ExpandLess /> : <ExpandMore />}
                  >
                    {expandMsme ? 'Read Less' : 'Read More About MSMEs'}
                  </Button>
                  
                  <Collapse in={expandMsme} timeout={500}>
                    <div className="expanded-content">
                      <Typography variant="h6" className="expanded-subtitle">
                        Government Initiatives & Support
                      </Typography>
                      <Typography variant="body1" paragraph>
                        The Indian government has launched numerous initiatives to strengthen the MSME sector, 
                        including the 'Atmanirbhar Bharat' package worth ₹20 lakh crore, which provides 
                        substantial support to MSMEs through various schemes and policies.
                      </Typography>

                      <Typography variant="h6" className="expanded-subtitle">
                        Key Government Schemes
                      </Typography>
                      <ul className="scheme-list">
                        <li>
                          <strong>PMEGP (Prime Minister's Employment Generation Programme):</strong>
                          {' '}Provides credit-linked subsidies for setting up new micro-enterprises.
                        </li>
                        <li>
                          <strong>CGTMSE (Credit Guarantee Fund Scheme):</strong>
                          {' '}Offers collateral-free credit up to ₹2 crore for MSMEs.
                        </li>
                        <li>
                          <strong>CLCSS (Credit Linked Capital Subsidy Scheme):</strong>
                          {' '}Supports technology upgradation with 15% capital subsidy.
                        </li>
                        <li>
                          <strong>MSME Samadhaan:</strong>
                          {' '}Addresses delayed payments to MSMEs through facilitation councils.
                        </li>
                      </ul>

                      <Typography variant="h6" className="expanded-subtitle">
                        Economic Impact & Future Outlook
                      </Typography>
                      <Typography variant="body1" paragraph>
                        MSMEs are crucial for achieving India's vision of a $5 trillion economy. 
                        They promote inclusive growth by generating employment in rural and 
                        semi-urban areas, reducing regional disparities, and ensuring equitable 
                        distribution of national income and wealth.
                      </Typography>
                      
                      <Typography variant="body1" paragraph>
                        The sector is undergoing rapid digitalization and modernization, with 
                        increasing adoption of e-commerce, digital payments, and modern manufacturing 
                        technologies. Government initiatives like 'Digital MSME' are facilitating 
                        this transformation, making MSMEs more competitive in the global market.
                      </Typography>

                      <div className="impact-stats-detailed">
                        <div className="stat-item">
                          <Typography variant="h4">63%</Typography>
                          <Typography variant="body2">MSMEs in Manufacturing Sector</Typography>
                        </div>
                        <div className="stat-item">
                          <Typography variant="h4">80%</Typography>
                          <Typography variant="body2">Jobs through Self-Employment</Typography>
                        </div>
                        <div className="stat-item">
                          <Typography variant="h4">33%</Typography>
                          <Typography variant="body2">Manufacturing GVA Contribution</Typography>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <div className="impact-visual">
                <div className="chart-container">
                  <div className="chart-item">
                    <div className="chart-progress manufacturing">
                      <Typography variant="h3">45%</Typography>
                      <Typography variant="subtitle1">Manufacturing</Typography>
                    </div>
                  </div>
                  <div className="chart-item">
                    <div className="chart-progress exports">
                      <Typography variant="h3">48%</Typography>
                      <Typography variant="subtitle1">Exports</Typography>
                    </div>
                  </div>
                  <div className="chart-item">
                    <div className="chart-progress gdp">
                      <Typography variant="h3">30%</Typography>
                      <Typography variant="subtitle1">GDP</Typography>
                    </div>
                  </div>
                </div>
                <div className="impact-image-wrapper">
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop&q=80"
                    alt="MSME Impact" 
                    className="impact-image"
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <Typography variant="h2" className="section-title">
            Why Choose BizHIVE?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                  <Card className="feature-card">
                    <CardContent>
                      <IconButton className="feature-icon">
                        {feature.icon}
                      </IconButton>
                      <Typography variant="h6" className="feature-title">
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" className="feature-description">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <Container>
          <Typography variant="h2" className="section-title">
            MSME Benefits
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="benefit-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={benefit.image}
                    alt={benefit.title}
                    className="benefit-image"
                  />
                  <CardContent>
                    <IconButton className="benefit-icon">
                      {benefit.icon}
                    </IconButton>
                    <Typography variant="h6" className="benefit-title">
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" className="benefit-description">
                      {benefit.description}
                    </Typography>
                    <ul className="benefit-points">
                      {benefit.points.map((point, idx) => (
                        <li key={idx}>
                          <CheckCircle className="check-icon" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Government Schemes Section */}
      <section className="schemes-section">
        <Container>
          <Typography variant="h2" className="section-title">
            Key Government Schemes for MSMEs
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card className="scheme-card">
                <CardContent>
                  <Typography variant="h6">Udyam Registration</Typography>
                  <Typography variant="body2">
                    Get recognized as an MSME and unlock a world of benefits including subsidies, loans, and market access.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="scheme-card">
                <CardContent>
                  <Typography variant="h6">Credit Guarantee Scheme (CGTMSE)</Typography>
                  <Typography variant="body2">
                    Avail collateral-free loans up to ₹2 crore under the CGTMSE scheme.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="scheme-card">
                <CardContent>
                  <Typography variant="h6">Technology Upgradation (CLCSS)</Typography>
                  <Typography variant="body2">
                    Get up to 15% capital subsidy for upgrading your business technology.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Eligibility Checker Section */}
      <section className="eligibility-section">
        <Container>
          <Typography variant="h2" className="section-title">
            Check Your MSME Scheme Eligibility
          </Typography>
          <Box className="eligibility-form-wrapper">
            <form className="eligibility-form">
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <input className="eligibility-input" type="text" placeholder="Business Type (e.g. Manufacturing)" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <input className="eligibility-input" type="number" placeholder="Annual Turnover (₹ in Lakhs)" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <input className="eligibility-input" type="number" placeholder="Years in Operation" />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" className="eligibility-btn">
                    Check Now
                  </Button>
                </Grid>
              </Grid>
            </form>
            {/* Placeholder for eligibility result */}
          </Box>
        </Container>
      </section>

      {/* Success Stories */}
      <section className="success-section">
        <Container>
          <Typography variant="h2" className="section-title">
            Success Stories
          </Typography>
          <Grid container spacing={4}>
            {successStories.map((story, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="story-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={story.image}
                    alt={story.title}
                    className="story-image"
                  />
                  <CardContent>
                    <Typography variant="h6" className="story-title">
                      {story.title}
                    </Typography>
                    <Typography variant="body2" className="story-description">
                      {story.description}
                    </Typography>
                    <Button 
                      endIcon={<ArrowForward />}
                      className="read-more-btn"
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Resource Center Section */}
      <section className="resources-section">
        <Container>
          <Typography variant="h2" className="section-title">
            MSME Resource Center
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card className="resource-card">
                <CardContent>
                  <Typography variant="h6">MSME Registration Guide</Typography>
                  <Typography variant="body2">Step-by-step PDF guide to register your MSME and access government benefits.</Typography>
                  <Button className="resource-btn" href="#" target="_blank">Download PDF</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="resource-card">
                <CardContent>
                  <Typography variant="h6">Upcoming Webinar</Typography>
                  <Typography variant="body2">Join our free webinar: "How to Grow Your MSME with Government Schemes"</Typography>
                  <Button className="resource-btn" href="#" target="_blank">Register</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="resource-card">
                <CardContent>
                  <Typography variant="h6">FAQs</Typography>
                  <Typography variant="body2">Find answers to the most common questions about MSME registration and benefits.</Typography>
                  <Button className="resource-btn" href="#" target="_blank">View FAQs</Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Community & Support Section */}
      <section className="community-section">
        <Container>
          <Typography variant="h2" className="section-title">
            Join the MSME Community
          </Typography>
          <Typography variant="body1" className="community-description">
            Get expert help, share your experience, and connect with other MSME owners.
          </Typography>
          <Box className="community-actions">
            <Button variant="outlined" className="community-btn" href="#" target="_blank">
              Join WhatsApp Group
            </Button>
            <Button variant="outlined" className="community-btn" href="#" target="_blank">
              Visit Support Forum
            </Button>
            <Button variant="outlined" className="community-btn" href="mailto:support@bizhive.com">
              Contact Support
            </Button>
          </Box>
        </Container>
      </section>

      {/* Trust & Security Section */}
      <section className="trust-section">
        <Container>
          <Typography variant="h2" className="section-title">
            Trusted & Secure
          </Typography>

          {/* Trust Badges */}
          <Grid container spacing={4} justifyContent="center" alignItems="center" className="trust-badges-row">
            <Grid item xs={12} md={3}>
              <Box className="trust-badge">
                <img src="https://img.icons8.com/ios-filled/100/2196f3/privacy.png" alt="User Data Privacy" className="trust-logo" />
                <Typography variant="body2">100% User Data Privacy</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box className="trust-badge">
                <img src="https://img.icons8.com/ios-filled/100/2196f3/lock--v1.png" alt="Data Security" className="trust-logo" />
                <Typography variant="body2">Enterprise-grade Data Security</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box className="trust-badge">
                <img src="https://img.icons8.com/ios-filled/100/2196f3/approval.png" alt="Trusted by MSMEs" className="trust-logo" />
                <Typography variant="body2">Trusted by 6.3+ Crore MSMEs</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box className="trust-badge">
                <img src="https://img.icons8.com/ios-filled/100/2196f3/gdpr.png" alt="GDPR ISO Compliant" className="trust-logo" />
                <Typography variant="body2">GDPR & ISO Compliant</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box className="trust-badge">
                <img src="https://img.icons8.com/ios-filled/100/2196f3/price-tag-euro.png" alt="Transparent Pricing" className="trust-logo" />
                <Typography variant="body2">Transparent Pricing</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Typography variant="h3" className="cta-title">
            Ready to Scale Your Business?
          </Typography>
          <Typography variant="h6" className="cta-subtitle">
            Join 6.3+ Crore MSMEs already growing with government support
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/signup')}
            className="cta-button"
          >
            Register Now
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default Home; 
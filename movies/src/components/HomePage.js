
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,

  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';

import { ArrowForward } from '@mui/icons-material';
import { MapPin, Home } from 'lucide-react';
import { Phone as PhoneIcon, Mail as MailIcon, AccessTime } from '@mui/icons-material';
import MovieItem from './Movies/MovieItem';
import { getAllMovies } from '../api-helper/api_helper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import aboutImage from './img/h-about.jpg';

const HomePage = () => {
  const [zoom] = useState(1);
  const [movies, setMovies] = useState([]);
  const images = [
    "https://blog.inevent.com/wp-content/uploads/2024/04/The-Road-to-Return-on-Investment-With-EMS_1-min.webp",
    "https://blog.inevent.com/wp-content/uploads/2024/04/A-Case-for-Customization-in-Your-Event-Management-Software_2-min.webp",
    "https://blog.inevent.com/wp-content/uploads/2024/04/What-is-an-Event-Management-Software-Types-Benefits-and-Features-1180x570.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 12000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);



  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  // References for sections
  const aboutRef = useRef(null);
  const eventsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };



  return (
    <Box width={'100%'} height={'auto'} marginTop={2}>
      {/* Hero Section */}
      <Box
        margin={'auto'}
        width="100%"
        height={"30%"}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        paddingTop={-2}
      >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" ,position:'sticky'}}
        />

      </Box>

      {/* About Conference Section */}
      <Box ref={aboutRef}>
        <section>
          <Container sx={{ py: 4 }}>
            <Grid container spacing={4} alignItems="center">
              {/* Image Section */}
              <Grid item xs={12} md={6}>
                <Box>
                  <img
                    src={aboutImage}
                    alt="About Conference"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </Box>
              </Grid>
              {/* Text Section */}
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    About Event Management
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Event management refers to the process of planning, organizing, and executing events, which can range from small gatherings to large-scale conferences, concerts, festivals, or corporate events.
                     It involves a systematic approach to ensure that all aspects of the event are efficiently coordinated to deliver a seamless and memorable experience for attendees.

                    Event management typically combines creativity, logistics, and project management skills to achieve the desired goals of the event.
                  </Typography>
                  <List>
                    {[
                      'Write On Your Business Card',
                      'Advertising Outdoors',
                      'Effective Advertising Pointers',
                      'Kook 2 Directory Add Url Free',
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ pl: 0 }}>
                        <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <Typography variant="body2">{item}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Button variant="contained" color="primary"
                    LinkComponent={Link}
                    to="/createEvent"
                    sx={{ mt: 2 }}>
                    Create Event
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>
      </Box>

      {/* Latest Events Section */}
      <Box ref={eventsRef} sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
            Latest Events
          </Typography>
          <Grid container spacing={4}>
            {movies.slice(0, 6).map((movie, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <MovieItem
                  id={movie.id}
                  title={movie.title}
                  releaseDate={movie.releaseDate}
                  location={movie.location}
                  postedUrl={movie.postedUrl}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              LinkComponent={Link}
              to="/events"
              endIcon={<ArrowForward />}
            >
              View All Events
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Contact Us Section */}
      <Box ref={contactRef} sx={{ width: '100%', py: 16, bgcolor: 'grey.100' }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Contact Us
          </Typography>

          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Our Locations
                  </Typography>

                  {/* Main Office */}
                  <Box mb={4}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <MapPin className="w-5 h-5 text-primary" />
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          Main Office
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Plot No. 123, Khandagiri
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Bhubaneswar, Odisha 751030
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Branch Office */}
                  <Box mb={4}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Home className="w-5 h-5 text-primary" />
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          Branch Office
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Near Bharatpur Square
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Bhubaneswar, Odisha 751003
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Contact Details */}
                  <Box>
                    <List>
                      <ListItem>
                        <PhoneIcon sx={{ color: 'primary.main', mr: 2 }} />
                        <ListItemText
                          primary="+91 987 654 3210"
                          secondary="+91 876 543 2109"
                        />
                      </ListItem>
                      <ListItem>
                        <MailIcon sx={{ color: 'primary.main', mr: 2 }} />
                        <ListItemText primary="info@eventmanagement.com" />
                      </ListItem>
                      <ListItem>
                        <AccessTime sx={{ color: 'primary.main', mr: 2 }} />
                        <ListItemText primary="Mon - Sat: 10:00 AM - 7:00 PM" />
                      </ListItem>
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Map */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent sx={{ padding: 1 }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '300px',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '8px',
                    }}
                  >
                    <iframe
                      title="Location Map"
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.40927239676!2d85.7419592!3d20.2960587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1701234567890!5m2!1sen!2sin&zoom=${zoom}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 0,
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container>
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Event Management</Typography>
              <Typography variant="body2" color="textSecondary">
                Creating memorable experiences through perfectly planned events in Bhubaneswar and beyond.
              </Typography>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Quick Links</Typography>
              <List>
                <ListItem button onClick={() => scrollToSection(aboutRef)}>
                  <ListItemText primary="About Us" sx={{ color: 'textSecondary' }} /></ListItem>
                <ListItem button onClick={() => scrollToSection(eventsRef)}><ListItemText primary="Services" sx={{ color: 'textSecondary' }} /></ListItem>
                <ListItem button onClick={() => scrollToSection(eventsRef)}><ListItemText primary="Events" sx={{ color: 'textSecondary' }} /></ListItem>
                <ListItem button onClick={() => scrollToSection(contactRef)}><ListItemText primary="Contact" sx={{ color: 'textSecondary' }} /></ListItem>
              </List>
            </Grid>

            {/* Services */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Services</Typography>
              <List>
                <ListItem><ListItemText primary="Corporate Events" sx={{ color: 'textSecondary' }} /></ListItem>
                <ListItem><ListItemText primary="Weddings" sx={{ color: 'textSecondary' }} /></ListItem>
                <ListItem><ListItemText primary="Birthday Parties" sx={{ color: 'textSecondary' }} /></ListItem>
                <ListItem><ListItemText primary="Conferences" sx={{ color: 'textSecondary' }} /></ListItem>
              </List>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Contact Info</Typography>
              <List>
                <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
                  <MapPin className="w-4 h-4" sx={{ color: 'primary.main', mr: 2 }} />
                  <ListItemText primary="Khandagiri, Bhubaneswar" sx={{ color: 'textSecondary' }} />
                </ListItem>
                <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon sx={{ color: 'primary.main', mr: 2 }} />
                  <ListItemText primary="+91 987 654 3210" sx={{ color: 'textSecondary' }} />
                </ListItem>
                <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
                  <MailIcon sx={{ color: 'primary.main', mr: 2 }} />
                  <ListItemText primary="info@eventmanagement.com" sx={{ color: 'textSecondary' }} />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="body2" align="center" color="textSecondary">
            © 2024 Event Management System. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;

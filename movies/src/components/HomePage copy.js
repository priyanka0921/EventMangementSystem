// import React, {useState, useEffect } from 'react'
// import { Box } from "@mui/system";
// import { Container, Grid, Typography, Button, List, ListItem, ListItemIcon } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import aboutImage from './img/h-about.jpg';
// import MovieItem from './Movies/MovieItem';
// import { Link } from "react-router-dom";
// import { getAllMovies } from '../api-helper/api_helper';
// const HomePage = () => {
//   const[movies,setMovies]=useState([]);
//   useEffect(()=>
//   {
//     getAllMovies().then((data)=>setMovies(data.movies))
//     .catch((err)=>console.log(err));
//   }
//   ,[])
//   console.log(movies);
//   return (
//     <Box width={'100%'} height={'auto'} marginTop={2}>
//   <Box margin={'auto'} width="100%" height={"30%"} display={'flex'} justifyContent={'center'} alignItems={'center'} padding={2}>
//   <img
//       src="https://i.ytimg.com/vi/yEinBUJG2RI/maxresdefault.jpg"
//       alt="Rocketry"
//       width="100%"
//       height="100%"
//     />


//   </Box>
//   <Box>
//   <section className="home-about-section">
//   <Container sx={{ py: 4 }}>
//     <Grid container spacing={4} alignItems="center">
//       {/* Image Section */}
//       <Grid item xs={12} md={6}>
//         <div className="ha-pic">
//           <img
//             src={aboutImage}
//             alt="About Conference"
//             style={{ width: '100%', borderRadius: '8px' }}
//           />
//         </div>
//       </Grid>
//       {/* Text Section */}
//       <Grid item xs={12} md={6}>
//         <div className="ha-text">
//           <Typography variant="h4" gutterBottom>
//             About Conference
//           </Typography>
//           <Typography variant="body1" paragraph>
//             When I first got into the online advertising business, I was looking for the magical
//             combination that would put my website into the top search engine rankings, catapult me to
//             the forefront of the minds or individuals looking to buy my product, and generally make me
//             rich beyond my wildest dreams! After succeeding in the business for this long, I’m able to
//             look back on my old self with this kind of thinking and shake my head.
//           </Typography>
//           <List>
//             {[
//               'Write On Your Business Card',
//               'Advertising Outdoors',
//               'Effective Advertising Pointers',
//               'Kook 2 Directory Add Url Free',
//             ].map((item, index) => (
//               <ListItem key={index} sx={{ pl: 0 }}>
//                 <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
//                   <CheckCircleIcon color="primary" />
//                 </ListItemIcon>
//                 <Typography variant="body2">{item}</Typography>
//               </ListItem>
//             ))}
//           </List>
//           <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//             Discover Now
//           </Button>
//         </div>
//       </Grid>
//     </Grid>
//   </Container>
// </section>
// </Box>


//     <Box padding={5} margin= 'auto'>
//       <Typography variant="h4" textAlign={'center'}> Latest Events

//       </Typography>

//     </Box>
//     <Box display="flex" width='100%'justifyContent={'center'} flexWrap="wrap">
//       {movies.slice(0,5).map((movie, index) => <MovieItem id={movie.id} title={movie.title} releaseDate={movie.releaseDate}  location={movie.location} postedUrl={movie.postedUrl} key={index} />)}
//     </Box>
//     <Box display="flex" padding={5} margin="auto">
//         <Button
//           LinkComponent={Link}
//           to="/events"
//           variant="outlined"
//           sx={{ margin: "auto", color: "#2b2d42" }}
//         >
//           View All Movies
//         </Button>
//       </Box>

//       <Box sx={{ backgroundColor: '#333', color: '#fff', py: 3, textAlign: 'center' }}>
//         <Typography variant="body2">
//           © 2024 Your Event Management System. All rights reserved.
//         </Typography>
//       </Box>

//     </Box>
//   )
// }

// export default HomePage
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,

  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,

  Divider
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import aboutImage from './img/h-about.jpg';
 import { ArrowForward, } from '@mui/icons-material';
import { MapPin, Home } from 'lucide-react';
import { Phone as PhoneIcon, Mail as MailIcon, AccessTime } from '@mui/icons-material';
import MovieItem from './Movies/MovieItem';
import { getAllMovies } from '../api-helper/api_helper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HomePage = () => {
  const [zoom, setZoom] = useState(1);
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);



  const handleZoomIn = () => {
    if (zoom < 2) {
      setZoom(zoom + 0.1); // Increase zoom
    }
  };

  const handleZoomOut = () => {
    if (zoom > 0.5) {
      setZoom(zoom - 0.1); // Decrease zoom
    }
  };

  return (
    <Box width={'100%'} height={'auto'} marginTop={2}>


      {/* Hero Section */}
      <Box margin={'auto'} width="100%" height={"30%"} display={'flex'} justifyContent={'center'} alignItems={'center'} padding={2}>
        <img
          src="https://i.ytimg.com/vi/yEinBUJG2RI/maxresdefault.jpg"
          alt="Rocketry"
          width="100%"
          height="100%"
        />
      </Box>
      <Box>
        <section >
          <Container sx={{ py: 4 }}>
            <Grid container spacing={4} alignItems="center">
              {/* Image Section */}
              <Grid item xs={12} md={6}>
                <Box >
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
                    About Conference
                  </Typography>
                  <Typography variant="body1" paragraph>
                    When I first got into the online advertising business, I was looking for the magical
                    combination that would put my website into the top search engine rankings, catapult me to
                    the forefront of the minds or individuals looking to buy my product, and generally make me
                    rich beyond my wildest dreams! After succeeding in the business for this long, I’m able to
                    look back on my old self with this kind of thinking and shake my head.
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
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Discover Now
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>
      </Box>

      {/* Latest Events Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>Latest Events</Typography>
          <Grid container spacing={4}>
            {movies.slice(0, 6).map((movie, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <MovieItem id={movie.id} title={movie.title} releaseDate={movie.releaseDate} location={movie.location} postedUrl={movie.postedUrl} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button variant="outlined" size="large" LinkComponent={Link} to="/events" endIcon={<ArrowForward />}>View All Events</Button>
          </Box>
        </Container>
      </Box>

      {/* Contact Us Section */}
      {/* Contact Section */}
      <Box sx={{ width: '100%', py: 16, bgcolor: 'grey.100' }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>Contact Us</Typography>

          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Our Locations</Typography>

                  {/* Main Office */}
                  <Box mb={4}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <Typography variant="body1" fontWeight="bold">Main Office</Typography>
                        <Typography variant="body2" color="textSecondary">Plot No. 123, Khandagiri</Typography>
                        <Typography variant="body2" color="textSecondary">Bhubaneswar, Odisha 751030</Typography>
                      </div>
                    </Box>
                  </Box>

                  {/* Branch Office */}
                  <Box mb={4}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Home className="w-5 h-5 text-primary" />
                      <div>
                        <Typography variant="body1" fontWeight="bold">Branch Office</Typography>
                        <Typography variant="body2" color="textSecondary">Near Bharatpur Square</Typography>
                        <Typography variant="body2" color="textSecondary">Bhubaneswar, Odisha 751003</Typography>
                      </div>
                    </Box>
                  </Box>

                  {/* Contact Details */}
                  <Box>
                    <List>
                      <ListItem>
                        <PhoneIcon sx={{ color: 'primary.main', mr: 2 }} />
                        <ListItemText primary="+91 987 654 3210" secondary="+91 876 543 2109" />
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
                      height: '300px', // Square shape
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
                        transition: 'transform 0.3s ease', // Smooth zoom transition
                      }}
                    />
                  </Box>

                  {/* Zoom In and Zoom Out buttons */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton onClick={handleZoomIn} color="primary" sx={{ marginBottom: 1 }}>
                      <Add />
                    </IconButton>
                    <IconButton onClick={handleZoomOut} color="primary" >
                      <Remove />
                    </IconButton>
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
                <ListItem><ListItemText primary="About Us" sx={{ color: 'textSecondary' }} /></ListItem>
                <ListItem><ListItemText primary="Services" sx={{ color: 'textSecondary' }} /></ListItem>
                <ListItem><ListItemText primary="Events" sx={{ color: 'textSecondary' }} /></ListItem>
                <ListItem><ListItemText primary="Contact" sx={{ color: 'textSecondary' }} /></ListItem>
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

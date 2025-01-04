
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
// import { useParams } from 'react-router-dom';
// import { getMoviesAndApprovedEvents, newBooking } from '../../api-helper/api_helper';
// import { Typography, Box, Button, RadioGroup, FormControlLabel, Radio, TextField, FormLabel, Modal } from '@mui/material';

// const Bookings = () => {
//   const [events, setEvents] = useState([]); // Store approved events
//   const [movie, setMovie] = useState(null); // Store selected movie
//   const [inputs, setInputs] = useState({ seatNumber: 1, date: "", seatType: "premium" });
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [openModal, setOpenModal] = useState(false); // To manage modal visibility
//   const [bookingDetails, setBookingDetails] = useState(null); // Store booking confirmation details
//   const id = useParams().id; // Get the movie/event ID from the URL

//   useEffect(() => {
//     getMoviesAndApprovedEvents().then((res) => {
//       setEvents(res.approvedEvents); // Set approved events
//       const selectedMovie = res.movies.find(movie => movie._id === id); // Find selected movie by ID
//       setMovie(selectedMovie);
//       if (selectedMovie) {
//         setTotalPrice(selectedMovie.price.premium); // Default to premium price
//       }
//     }).catch((err) => console.log(err));
//   }, [id]); // Fetch data when the component mounts or ID changes

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputs(prev => ({ ...prev, [name]: value }));

//     if (name === "seatNumber" || name === "seatType") {
//       const seatCount = name === "seatNumber" ? value : inputs.seatNumber;
//       const seatType = name === "seatType" ? value : inputs.seatType;
//       if (movie) {
//         setTotalPrice(seatCount * movie.price[seatType]);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (movie) {
//       newBooking({ ...inputs, movie: movie._id })
//         .then((res) => {
//           // Set the booking details and show the modal
//           setBookingDetails({
//             title: movie.title,
//             seatNumber: inputs.seatNumber,
//             totalPrice: totalPrice,
//             date: inputs.date,
//             postedUrl: movie.postedUrl
//           });
//           setOpenModal(true); // Open the modal on successful booking
//         })
//         .catch(err => console.log(err));
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   return (
//     <Box>
//       {/* Display movie details */}
//       {movie && (
//         <Fragment>
//           <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign={"center"}>
//             Book Tickets for Event: {movie.title}
//           </Typography>
//           <Box display={"flex"} justifyContent={"center"}>
//             <Box display={"flex"} flexDirection="column" paddingTop={3} width="50%" marginRight={"auto"}>
//               <img width="80%" height={"300px"} src={movie.postedUrl} alt={movie.title} />
//               <Box width={"80%"} marginTop={3} padding={2}>
//                 <Typography paddingTop={2}>{movie.description}</Typography>
//                 <Typography fontWeight={"bold"} marginTop={1}>
//                   Starrer: {movie.actors.join(", ")}
//                 </Typography>
//                 <Typography fontWeight={"bold"} marginTop={1}>
//                   Release Date: {new Date(movie.releaseDate).toDateString()}
//                 </Typography>
//                 <Typography paddingTop={2}>{movie.location}</Typography>
//               </Box>
//             </Box>
//             <Box width={"50%"} paddingTop={3}>
//               <form onSubmit={handleSubmit}>
//                 <Box padding={5} margin={"auto"} display="flex" flexDirection={"column"}>
//                   <FormLabel>Seat Type</FormLabel>
//                   <RadioGroup name="seatType" value={inputs.seatType} onChange={handleChange} row>
//                     <FormControlLabel value="premium" control={<Radio />} label={`Premium (₹${movie.price.premium})`} />
//                     <FormControlLabel value="royalClub" control={<Radio />} label={`Royal Club (₹${movie.price.royalClub})`} />
//                     <FormControlLabel value="executive" control={<Radio />} label={`Executive (₹${movie.price.executive})`} />
//                   </RadioGroup>

//                   <FormLabel>Number of Seats</FormLabel>
//                   <TextField name="seatNumber" type="number" value={inputs.seatNumber} onChange={handleChange} margin="normal" variant="standard" inputProps={{ min: 1, max: 10 }} />

//                   <FormLabel>Booking Date</FormLabel>
//                   <TextField name="date" type={"date"} margin="normal" variant="standard" value={inputs.date} onChange={handleChange} inputProps={{ min: new Date().toISOString().split("T")[0] }} />

//                   <Typography fontWeight="bold" marginTop={2}>
//                     Total Price: ₹{totalPrice}
//                   </Typography>

//                   <Button type="submit" sx={{ mt: 3 }}>
//                     Pay Now
//                   </Button>
//                 </Box>
//               </form>
//             </Box>
//           </Box>
//         </Fragment>
//       )}

//       {/* Displaying approved events */}
//       <Fragment>
//         <Typography variant="h5" fontWeight="bold" marginTop={3}>
//           Approved Events
//         </Typography>
//         <Box display={"flex"} flexWrap="wrap">
//           {events.map((event) => (
//             <Box key={event._id} width="30%" margin="10px" padding={2} boxShadow={3}>
//               {/* Displaying the event's image */}
//               {event.postedUrl && (
//                 <img 
//                   src={event.postedUrl} 
//                   alt={event.title} 
//                   style={{ width: "100%", height: "200px", objectFit: "cover", marginBottom: "10px" }} 
//                 />
//               )}
//               <Typography variant="h6">{event.title}</Typography>
//               <Typography>{event.description}</Typography>
//               <Button variant="contained" color="primary" onClick={() => setMovie(event)}>
//                 Book Now
//               </Button>
//             </Box>
//           ))}
//         </Box>
//       </Fragment>

//       {/* Modal for successful booking */}
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         aria-labelledby="booking-confirmation"
//         aria-describedby="successful-booking-details"
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             p: 4,
//             textAlign: 'center'
//           }}
//         >
//           {bookingDetails && (
//             <Fragment>
//               <Typography variant="h6" fontWeight="bold">
//                 Booking Successful!
//               </Typography>
//               <img
//                 src={bookingDetails.postedUrl}
//                 alt={bookingDetails.title}
//                 style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }}
//               />
//               <Typography variant="body1">
//                 Movie: {bookingDetails.title}
//               </Typography>
//               <Typography variant="body1">
//                 Seats: {bookingDetails.seatNumber}
//               </Typography>
//               <Typography variant="body1">
//                 Total Price: ₹{bookingDetails.totalPrice}
//               </Typography>
//               <Typography variant="body1">
//                 Booking Date: {new Date(bookingDetails.date).toDateString()}
//               </Typography>
//               <Button variant="contained" color="primary" onClick={handleCloseModal} sx={{ mt: 2 }}>
//                 Confirm
//               </Button>
//             </Fragment>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Bookings;


// import { Box } from "@mui/system";
// import React, { Fragment, useEffect, useState } from "react";
// import {
//   deleteBooking,
//   getUserBooking,
//   getUserDetails,
// } from "../api-helper/api_helper";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import {
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// const UserProfile = () => {
//   const [bookings, setBookings] = useState();
//   const [user, setUser] = useState();
//   useEffect(() => {
//     getUserBooking()
//       .then((res) => setBookings(res.bookings))
//       .catch((err) => console.log(err));

//     getUserDetails()
//       .then((res) => setUser(res.user))
      
//       .catch((err) => console.log(err));
//   }, []);
//   console.log("user details",user);
//   const handleDelete = (id) => {
//     deleteBooking(id)
//       .then((res) => {
//         console.log(res);
//         // Filter out the deleted booking from the bookings state
//         setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== id));
//       })
//       .catch((err) => console.log(err));
//   };
//   return (
//     <Box width={"100%"} display="flex">
//       <Fragment>
//         {" "}
//         {user && (
//           <Box
//             flexDirection={"column"}
//             justifyContent="center"
//             alignItems={"center"}
//             width={"30%"}
//             padding={3}
//           >
//             <AccountCircleIcon
//               sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
//             />
//             <Typography
//               padding={1}
//               width={"auto"}
//               textAlign={"center"}
//               border={"1px solid #ccc"}
//               borderRadius={6}
//             >
//               Name: {user.name}
//             </Typography>
//             <Typography
//               mt={1}
//               padding={1}
//               width={"auto"}
//               textAlign={"center"}
//               border={"1px solid #ccc"}
//               borderRadius={6}
//             >
//               Email: {user.email}
//             </Typography>
//           </Box>
//         )}
//         {bookings && (
//           <Box width={"70%"} display="flex" flexDirection={"column"}>
//             <Typography
//               variant="h3"
//               fontFamily={"verdana"}
//               textAlign="center"
//               padding={2}
//             >
//               Bookings
//             </Typography>
//             <Box
//               margin={"auto"}
//               display="flex"
//               flexDirection={"column"}
//               width="80%"
//             >
//               <List>
//                 {bookings.map((booking, index) => (
//                   <ListItem
//                     sx={{
//                       bgcolor: "#00d386",
//                       color: "white",
//                       textAlign: "center",
//                       margin: 1,
//                     }}
//                   >
//                     <ListItemText
//                       sx={{ margin: 1, width: "auto", textAlign: "left" }}
//                     >
//                       Movie: {booking.movie.title}
//                     </ListItemText>
//                     <ListItemText
//                       sx={{ margin: 1, width: "auto", textAlign: "left" }}
//                     >
//                       Seat: {booking.seatNumber}
//                     </ListItemText>
//                     <ListItemText
//                       sx={{ margin: 1, width: "auto", textAlign: "left" }}
//                     >
//                       Date: {new Date(booking.date).toDateString()}
//                     </ListItemText>
//                     <IconButton
//                       onClick={() => handleDelete(booking._id)}
//                       color="error"
//                     >
//                       <DeleteForeverIcon />
//                     </IconButton>
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           </Box>
//         )}
//       </Fragment>
//     </Box>
//   );
// };

// export default UserProfile;
// import { Box, Grid, Typography, Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
// import React, { Fragment, useEffect, useState } from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { getUserBooking, getUserDetails, getUserCreatedEvents, deleteBooking } from "../api-helper/api_helper";

// const UserProfile = () => {
//   const [bookings, setBookings] = useState([]);
//   const [user, setUser] = useState(null);
//   const [createdEvents, setCreatedEvents] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     getUserBooking()
//       .then((res) => setBookings(res.bookings))
//       .catch((err) => console.log(err));

//     getUserDetails()
//       .then((res) => setUser(res.user))
//       .catch((err) => console.log(err));

//     getUserCreatedEvents(userId)
//       .then((res) => {
//         if (res) {
//           setCreatedEvents(res.events);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleDelete = (id) => {
//     deleteBooking(id)
//       .then((res) => {
//         setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== id));
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <Box sx={{ maxWidth: 1200, margin: "0 auto", mt: 4 }}>
//       <Grid container spacing={4}>
//         {/* User Info Section */}
//         <Grid item xs={12} sm={4}>
//           <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
//             <AccountCircleIcon sx={{ fontSize: 100, color: "#00d386" }} />
//             {user && (
//               <>
//                 <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
//                   {user.name}
//                 </Typography>
//                 <Typography variant="body1" color="textSecondary">
//                   {user.email}
//                 </Typography>
//               </>
//             )}
//           </Paper>
//         </Grid>

//         {/* Bookings Section */}
//         <Grid item xs={12} sm={8}>
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//               My Bookings
//             </Typography>
//             {bookings && bookings.length > 0 ? (
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Movie</TableCell>
//                       <TableCell>Seat</TableCell>
//                       <TableCell>Date</TableCell>
//                       <TableCell>Action</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {bookings.map((booking) => (
//                       <TableRow key={booking._id}>
//                         <TableCell>{booking.movie.title}</TableCell>
//                         <TableCell>{booking.seatNumber}</TableCell>
//                         <TableCell>{new Date(booking.date).toDateString()}</TableCell>
//                         <TableCell>
//                           <IconButton onClick={() => handleDelete(booking._id)} color="error">
//                             <DeleteForeverIcon />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             ) : (
//               <Typography variant="body1" color="textSecondary" mt={2}>
//                 No bookings available.
//               </Typography>
//             )}
//           </Paper>
//         </Grid>

//         {/* Created Events Section */}
//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ padding: 3 }}>
//             <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//               Created Events
//             </Typography>
//             {createdEvents && createdEvents.length > 0 ? (
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Event Title</TableCell>
//                       <TableCell>Description</TableCell>
//                       <TableCell>Date</TableCell>
//                       <TableCell>Location</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {createdEvents.map((event) => (
//                       <TableRow key={event._id}>
//                         <TableCell>{event.title}</TableCell>
//                         <TableCell>{event.description}</TableCell>
//                         <TableCell>{new Date(event.date).toDateString()}</TableCell>
//                         <TableCell>{event.location}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             ) : (
//               <Typography variant="body1" color="textSecondary" mt={2}>
//                 No events created yet.
//               </Typography>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default UserProfile;
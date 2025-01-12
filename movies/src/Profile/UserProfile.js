
import { Box, Grid, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getUserBooking, getUserDetails, getUserCreatedEvents, deleteBooking, deleteEvent } from "../api-helper/api_helper";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [createdEvents, setCreatedEvents] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.log("User ID is missing from localStorage");
  }
    // Fetch user bookings
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    // Fetch user details
    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));

    // Fetch user created events
    getUserCreatedEvents(userId)
      .then((res) => {
        if (res) {
          setCreatedEvents(res.events);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteBooking = (id) => {
    deleteBooking(id)
      .then((res) => {
        setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id)
      .then((res) => {
        setCreatedEvents((prevEvents) => prevEvents.filter(event => event._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", mt: 4 }}>
      <Grid container spacing={4}>
        {/* User Info Section */}
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
            <AccountCircleIcon sx={{ fontSize: 100, color: "#00d386" }} />
            {user && (
              <>
                <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
                  {user.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {user.email}
                </Typography>
              </>
            )}
          </Paper>
        </Grid>

        {/* Bookings Section */}
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              My Bookings
            </Typography>
            {bookings && bookings.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Movie</TableCell>
                      <TableCell>Seat</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell>{booking.movie.title}</TableCell>
                        <TableCell>{booking.seatNumber}</TableCell>
                        <TableCell>{new Date(booking.date).toDateString()}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDeleteBooking(booking._id)} color="error">
                            <DeleteForeverIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" color="textSecondary" mt={2}>
                No bookings available.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Created Events Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Created Events
            </Typography>
            {createdEvents && createdEvents.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Event Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {createdEvents.map((event) => (
                      <TableRow key={event._id}>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.description}</TableCell>
                        <TableCell>{new Date(event.releaseDate).toDateString()}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDeleteEvent(event._id)} color="error">
                            <DeleteForeverIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" color="textSecondary" mt={2}>
                No events created yet.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;

import React, { useState, useEffect } from "react";
import { Person, Event } from "@mui/icons-material"; // Material UI icons
import { Box, Typography, Card, CardContent } from "@mui/material"; // MUI components
import { getAllUsers, getMovies, getAllBookings } from "../../api-helper/api_helper";

const Cards = () => {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]); // Ensure bookings is initialized as an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getAllUsers();
        const movieData = await getMovies();
        const bookingData = await getAllBookings();

        // Check if the booking data is available
        if (bookingData && Array.isArray(bookingData)) {
          setBookings(bookingData);
        } else {
          setBookings([]); // Ensure it's an empty array if data is not valid
        }

        setUsers(userData);
        setMovies(movieData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
        setBookings([]); // Set bookings to an empty array in case of an error
      }
    };

    fetchData();
  }, []);

  const usersCount = users.length;
  const moviesCount = movies.length;
  const bookingsCount = bookings.length;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        px: 2,
        margin: "-200px",
      }}
    >
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
            width: "100%",
            maxWidth: "900px",
          }}
        >
          {/* Event Card */}
          <Card
            sx={{
              width: { xs: "100%", sm: "30%" },
              textAlign: "center",
              backgroundColor: "#ff7f50",
              color: "white",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Events
              </Typography>
              <Event fontSize="large" sx={{ mb: 2 }} />
              <Typography variant="h6">
                Total Events: <strong>{moviesCount}</strong>
              </Typography>
            </CardContent>
          </Card>

          {/* Users Card */}
          <Card
            sx={{
              width: { xs: "100%", sm: "30%" },
              textAlign: "center",
              backgroundColor: "#8a2be2",
              color: "white",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Users
              </Typography>
              <Person fontSize="large" sx={{ mb: 2 }} />
              <Typography variant="h6">
                Total Users: <strong>{usersCount}</strong>
              </Typography>
            </CardContent>
          </Card>

          {/* Bookings Card */}
          <Card
            sx={{
              width: { xs: "100%", sm: "30%" },
              textAlign: "center",
              backgroundColor: "#20b2aa",
              color: "white",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Bookings
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {bookingsCount}
              </Typography>
              <Typography>Bookings</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Cards;


import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesAndApprovedEvents, newBooking } from '../../api-helper/api_helper';
import { Typography, Box, Button, RadioGroup, FormControlLabel, Radio, TextField, FormLabel, Snackbar, Alert, Modal } from '@mui/material';

const Bookings = () => {
  // const [events, setEvents] = useState([]); // Store approved events
  const [movie, setMovie] = useState(null); // Store selected movie
  const [inputs, setInputs] = useState({ seatNumber: 1, date: "", seatType: "premium" });
  const [totalPrice, setTotalPrice] = useState(0);
  const [openModal, setOpenModal] = useState(false); // To manage modal visibility
  const [bookingDetails, setBookingDetails] = useState(null); // Store booking confirmation details
  const id = useParams().id; // Get the movie/event ID from the URL
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Control Snackbar visibility // Snackbar visibility

  useEffect(() => {
    getMoviesAndApprovedEvents().then((res) => {
      // setEvents(res.approvedEvents); // Set approved events
      const selectedMovie = res.movies.find(movie => movie._id === id); // Find selected movie by ID
      setMovie(selectedMovie);
      if (selectedMovie) {
        setTotalPrice(selectedMovie.price.premium); // Default to premium price
      }
    }).catch((err) => console.log(err));
  }, [id]); // Fetch data when the component mounts or ID changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));

    if (name === "seatNumber" || name === "seatType") {
      const seatCount = name === "seatNumber" ? value : inputs.seatNumber;
      const seatType = name === "seatType" ? value : inputs.seatType;
      if (movie) {
        setTotalPrice(seatCount * movie.price[seatType]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie) {
      newBooking({ ...inputs, movie: movie._id })
        .then((res) => {

          // Set the booking details and show the modal
          setBookingDetails({
            title: movie.title,
            seatNumber: inputs.seatNumber,
            totalPrice: totalPrice,
            date: inputs.date,
            postedUrl: movie.postedUrl

          });
          setInputs({
            seatNumber: 1,
            date: "",
            seatType: "premium"
          })
          setOpenModal(true); // Open the modal on successful booking
         
        })
        .catch(err => console.log(err));
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleModalConfirm = () => {
    setOpenModal(false);   // Close the Modal
    setSnackbarOpen(true); // Show Snackbar
  };


  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false); // Close Snackbar
  };

  return (
    <Box>
      {/* Display movie details */}
      {movie && (
        <Fragment>
          <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign={"center"}>
            Book Tickets for Event: {movie.title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box display={"flex"} flexDirection="column" paddingTop={3} width="50%" marginRight={"auto"}>
              <img width="80%" height={"300px"} src={movie.postedUrl} alt={movie.title} />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Host: {movie.actors.join(", ")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
                <Typography paddingTop={2}>{movie.location}</Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box padding={5} margin={"auto"} display="flex" flexDirection={"column"}>
                  <FormLabel>Seat Type</FormLabel>
                  <RadioGroup name="seatType" value={inputs.seatType} onChange={handleChange} row>
                    <FormControlLabel value="premium" control={<Radio />} label={`Premium (₹${movie.price.premium})`} />
                    <FormControlLabel value="royalClub" control={<Radio />} label={`Royal Club (₹${movie.price.royalClub})`} />
                    <FormControlLabel value="executive" control={<Radio />} label={`Executive (₹${movie.price.executive})`} />
                  </RadioGroup>

                  <FormLabel>Number of Seats</FormLabel>
                  <TextField name="seatNumber" type="number" value={inputs.seatNumber} onChange={handleChange} margin="normal" variant="standard" inputProps={{ min: 1, max: 10 }} />

                  <FormLabel>Booking Date</FormLabel>
                  <TextField name="date" type={"date"} margin="normal" variant="standard" value={inputs.date} onChange={handleChange} inputProps={{ min: new Date().toISOString().split("T")[0] }} />

                  <Typography fontWeight="bold" marginTop={2}>
                    Total Price: ₹{totalPrice}
                  </Typography>

                  <Button type="submit" sx={{ mt: 3 }}>
                    Pay Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}

      {/* Displaying approved events */}

      

      {/* Modal for successful booking */}
      {/* Modal for successful booking */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="booking-confirmation"
        aria-describedby="successful-booking-details"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            textAlign: 'center'
          }}
        >
          {bookingDetails && (
            <Fragment>
              <Typography variant="h6" fontWeight="bold">
                Booking Successful!
              </Typography>
              <img
                src={bookingDetails.postedUrl}
                alt={bookingDetails.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }}
              />
              <Typography variant="body1">
                Movie: {bookingDetails.title}
              </Typography>
              <Typography variant="body1">
                Seats: {bookingDetails.seatNumber}
              </Typography>
              <Typography variant="body1">
                Total Price: ₹{bookingDetails.totalPrice}
              </Typography>
              <Typography variant="body1">
                Booking Date: {new Date(bookingDetails.date).toDateString()}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleModalConfirm} // Call this function
                sx={{ mt: 2 }}
              >
                Confirm
              </Button>
            </Fragment>
          )}
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Booking Successful! Movie has been added.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Bookings;

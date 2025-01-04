import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid ,Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,} from "@mui/material";
import { Link } from "react-router-dom";
import { createEvent } from "../../api-helper/api_helper"; // Import the createEvent function

const CreateEventPage = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    releaseDate: "",
    time: "",
    location: "",
    price: {
      premium: "",
      royalClub: "",
      executive: "",
    },
    postedUrl: "",
    featured: false,
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); 

  const formattedDate = formValues.releaseDate
    ? new Date(formValues.releaseDate).toLocaleDateString("en-US")
    : "";
  console.log(formattedDate); // Output: MM/DD/YYYY format

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "releaseDate") {
      setFormValues({
        ...formValues,
        releaseDate: value, // This directly updates the releaseDate state
      });
    } else if (name.startsWith("price")) {
      setFormValues({
        ...formValues,
        price: {
          ...formValues.price,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior

    // Call createEvent API function and pass form values
    createEvent(formValues)  // Sending form data to the backend
      .then((res) => {
        console.log("Event created successfully:", res);

        setIsSuccessModalOpen(true); 
        // Optionally redirect or refresh after success
       // window.location.reload(); // Refresh the page after successful creation
      })
      .catch((err) => {
        console.error("Error creating event:", err);
      });
  };
  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    window.location.reload(); // Refresh the page after closing the modal
  };
  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Title"
              name="title"
              variant="outlined"
              value={formValues.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              variant="outlined"
              multiline
              rows={4}
              value={formValues.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Release Date"
              name="releaseDate"
              type="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formValues.releaseDate ? formValues.releaseDate.substring(0, 10) : ""}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Time"
              name="time"
              type="time"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formValues.time}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              variant="outlined"
              value={formValues.location}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Ticket Pricing Fields */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Premium Ticket Price"
              name="price.premium"
              type="number"
              variant="outlined"
              value={formValues.price.premium}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Royal Club Ticket Price"
              name="price.royalClub"
              type="number"
              variant="outlined"
              value={formValues.price.royalClub}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Executive Ticket Price"
              name="price.executive"
              type="number"
              variant="outlined"
              value={formValues.price.executive}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Event Poster URL */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Poster URL"
              name="postedUrl"
              variant="outlined"
              value={formValues.postedUrl}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Featured Checkbox */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Featured"
              name="featured"
              type="checkbox"
              variant="outlined"
              value={formValues.featured}
              onChange={(e) => setFormValues({ ...formValues, featured: e.target.checked })}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* <Button
        variant="contained"
        color="secondary"
        LinkComponent={Link}
        to="/events"
        sx={{ mt: 2 }}
      >
        Discover Now
      </Button> */}
       <Dialog open={isSuccessModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          <Typography>
            The event has been created successfully.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
          <Button
            component={Link}
            to="/events"
            color="secondary"
            variant="contained"
          >
            View Events
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateEventPage;


import React from "react";
import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material';
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, location, postedUrl, id }) => {
  return (
    <Card 
      sx={{ 
        margin: 2,
        width: 250, // Adjusted width for a more balanced look
        height: 380, // Increased height for better content display
        borderRadius: 5, 
        background: 'linear-gradient(135deg, #e0e0e0, #ffffff)', // Soft gradient background
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        ":hover": {
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", // Enhanced hover effect
          transform: 'scale(1.05)', // Slight zoom effect on hover
          cursor: 'pointer',
        },
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      {/* Image section */}
      <Box sx={{ width: '100%', height: '50%', overflow: 'hidden', borderRadius: '5px 5px 0 0' }}>
        <img 
          height="100%" 
          width="100%" 
          src={postedUrl} 
          alt={title} 
          style={{ objectFit: 'contain', borderRadius: '5px 5px 0 0' }} 
        />
      </Box>
      
      {/* Card Content */}
      <CardContent sx={{ padding: 2 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
          {new Date(releaseDate).toDateString()}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {location}
        </Typography>
      </CardContent>

      {/* Card Actions (Button) */}
      <CardActions sx={{ padding: 2, justifyContent: 'center' }}>
        <Button 
          LinkComponent={Link} 
          to={`/booking/${id}`} 
          sx={{
            bgcolor: "#2b2d42", 
            color: "white",
            borderRadius: '20px', 
            padding: '10px 20px', 
            ":hover": {
              bgcolor: "#121217",
              transform: 'scale(1.05)', // Slight zoom on hover
            },
            transition: 'transform 0.3s ease-in-out',
          }} 
          variant="contained" 
          size="large"
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;

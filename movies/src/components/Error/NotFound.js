import React from "react";
import { Box, Typography, Button } from "@mui/material"; // Material UI components
import { Link } from "react-router-dom"; // For navigation

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#f5f5f5", // Light background
        textAlign: "center",
        px: 2, // Padding for smaller screens
      }}
    >
      <Typography variant="h1" sx={{ fontSize: { xs: "5rem", sm: "6rem" }, fontWeight: "bold", color: "#ff6f61" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, color: "#555" }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "#777" }}>
        The page you are looking for doesn't exist. Please log in or sign up to explore more!
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/auth"
          sx={{
            textTransform: "none",
            backgroundColor: "#007bff",
            "&:hover": { backgroundColor: "#0056b3" },
          }}
        >
          Register .... Here
        </Button>
        
      </Box>
    </Box>
  );
};

export default NotFound;

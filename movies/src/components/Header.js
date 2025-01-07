
import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Autocomplete, TextField, Tabs, Tab,
  IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import the MenuIcon
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from '../api-helper/api_helper';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { adminActions, userActions } from "../components/store/index";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);

  // State for Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutType, setLogoutType] = useState(null); // To track which type of user is logging out


  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    getAllMovies()
      .then((data) => {
        console.log("Movies from API:", data); // Debug here
        setMovies(data.movies);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  const logout = (isAdmin) => {
    // Dispatch logout action based on user type
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  // const handleChange = (_e, val) => {

  //   const movie = movies.find((movie) => movie.title === val);
  //   if (isUserLoggedIn) {
  //     navigate(`/booking/${movie._id}`);
  //   } else {
  //     navigate("/auth");
  //   }
  //   console.log(movie);
  // };
  const handleChange = (_e, val) => {
    // Find the movie object based on the selected title
    const movie = movies.find((movie) => movie.title === val);

    if (movie) {
      // If a movie is found and the user is logged in, navigate to the booking page
      if (isUserLoggedIn) {
        navigate(`/booking/${movie._id}`);
      } else {
        navigate("/auth"); // Redirect to authentication if not logged in
      }
    }
  };



  const handleLogoutClick = (isAdmin) => {
    // Show confirmation dialog
    setLogoutType(isAdmin); // Set the type of logout (admin or user)
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleConfirmLogout = () => {
    logout(logoutType); // Proceed with logout based on the type
    setOpenDialog(false); // Close the dialog
  };

  return (
    <AppBar position='sticky' sx={{ bgcolor: "#2b2d2b" }}>
      <Toolbar sx={{ width: '99%' }}>
        <Box width={'20%'}>
          <IconButton LinkComponent={Link} to="/">
            <MovieIcon />
          </IconButton>
        </Box>
        {/* Searchbar */}

        <Box width={'25%'} margin={'auto'}>
          <Autocomplete onChange={handleChange}
            freeSolo
            options={movies && movies.map((movie) => movie.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  input: { color: "white" },
                  '& .MuiInputLabel-root': { color: 'white' },
                  '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                  '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' },
                  '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                }} variant="standard" {...params} label="Search Across Event" />
            )}
          />
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Tabs textColor="inherit" indicatorColor='secondary'
            onChange={(e, val) => setValue(val)} value={value}>

            <Tab LinkComponent={Link} to="/events" label="Events" />

            {!isAdminLoggedIn && !isUserLoggedIn && (<>
              <Tab LinkComponent={Link} to="/auth" label="Auth" />
              <Tab LinkComponent={Link} to="/admin" label="Admin" />
            </>)}

            {isUserLoggedIn && (<>
              <Tab LinkComponent={Link} to="/user" label="Profile" />
              <Tab onClick={() => handleLogoutClick(false)} label="Logout" />
            </>)}
            {isAdminLoggedIn && (<>
              <Tab LinkComponent={Link} to="/dashboard" label="DashBoard" />
              <Tab LinkComponent={Link} to="/add" label="Add Events" />
              <Tab LinkComponent={Link} to="/manage_events" label="Mange Events" />
              <Tab LinkComponent={Link} to="/user_admin" label="Profile" />
              <Tab onClick={() => handleLogoutClick(true)} label="Logout" />
            </>)}
          </Tabs>
        </Box>


        {/* Hamburger Menu for smaller screens */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton  sx={{marginLeft:'auto'}}color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                navigate("/events");
                handleMenuClose();
              }}
            >
              Events
            </MenuItem>
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <MenuItem
                  onClick={() => {
                    navigate("/auth");
                    handleMenuClose();
                  }}
                >
                  Auth
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/admin");
                    handleMenuClose();
                  }}
                >
                  Admin
                </MenuItem>
              </>
            )}
            {isUserLoggedIn && (
              <>
                <MenuItem
                  onClick={() => {
                    navigate("/user");
                    handleMenuClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogoutClick(false);
                    handleMenuClose();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <MenuItem
                  onClick={() => {
                    navigate("/dashboard");
                    handleMenuClose();
                  }}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/add");
                    handleMenuClose();
                  }}
                >
                  Add Events
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/manage_events");
                    handleMenuClose();
                  }}
                >
                  Manage Events
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/user_admin");
                    handleMenuClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogoutClick(true);
                    handleMenuClose();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>





      </Toolbar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to log out?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;

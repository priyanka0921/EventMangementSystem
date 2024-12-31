// import React, { useEffect, useState } from 'react'
// import { AppBar, Toolbar, Autocomplete, TextField, Tabs, Tab, IconButton } from "@mui/material";
// import MovieIcon from "@mui/icons-material/Movie";
// import { Box } from "@mui/system";
// import { getAllMovies } from '../api-helper/api_helper';
// import { Link ,useNavigate} from 'react-router-dom';
// import { useSelector,useDispatch } from 'react-redux';
// import { adminActions, userActions } from "../components/store/index";
// const Header = () => {
//     const navigate = useNavigate();
// const dispatch=useDispatch();
//     const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
//     const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
//     const [value, setValue] = useState(0);
//     const [movies, setMovies] = useState([]);
    
//     useEffect(() => {
//         getAllMovies()
//             .then((data) => {
//                 console.log("Movies from API:", data); // Debug here
//                 setMovies(data.movies);
//             })
//             .catch((err) => console.error("Error fetching movies:", err));
//     }, []);

//      const logout=(isAdmin)=>
//      {
//         dispatch(isAdmin ? adminActions.logout() : userActions.logout())
//      }
//      const handleChange=(e,val)=>{
        
//         const movie= movies.find((movie)=>movie.title===val);
//         if (isUserLoggedIn) {
//             navigate(`/booking/${movie._id}`);
//           } else {
//             navigate("/auth");
//           }
//         console.log(movie);
//      }
     
//      return (
//         <AppBar position="sticky" sx={{ bgcolor: "#2b2d2b" }}>
//             <Toolbar>
//                 <Box width={'20%'}>
//                     <IconButton LinkComponent={Link} to="/">
//                     <MovieIcon/>
//                     </IconButton>


//                 </Box>
//                 {/* searchbar */}
//                 <Box width={'30%'} margin={'auto'}>
//                     <Autocomplete onChange={handleChange}
//                         freeSolo
//                         options={movies && movies.map((movie) => movie.title)}
//                         renderInput={(params) => (
//                             <TextField
//                                 sx={{
//                                     input: { color: "white" }, '& .MuiInputLabel-root': { color: 'white' }, // Changes the label color
//                                     '& .MuiInput-underline:before': { borderBottomColor: 'white' }, // Changes the underline color before focus
//                                     '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' }, // Changes underline on hover
//                                     '& .MuiInput-underline:after': { borderBottomColor: 'white' },
//                                 }} variant="standard" {...params} label="Search Across Event" />)}
//                     />

//                 </Box>
//                 <Box display={'flex'}>
//                     <Tabs textColor="inherit" indicatorColor='secondary' value={value}
//                         onChange={(e, val) => setValue(val)}>

//                         <Tab LinkComponent={Link} to="/events" label="Events" />
//                         {!isAdminLoggedIn && !isUserLoggedIn && (<>
//                             <Tab LinkComponent={Link} to="/auth" label="Auth" />
//                             <Tab LinkComponent={Link} to="/admin" label="Admin" />
//                         </>)}

//                         { isUserLoggedIn && (<>
//                             <Tab LinkComponent={Link} to="/user" label="Profile" />
//                             <Tab  onClick={()=>logout(false)}LinkComponent={Link} to="/" label="Logout" />
//                         </>)}
//                         { isAdminLoggedIn && (<>
//                             <Tab LinkComponent={Link} to="/add" label="Add Events" />
//                             <Tab LinkComponent={Link} to="/user_admin" label="Profile" />
//                             <Tab  onClick={()=>logout(true)}LinkComponent={Link} to="/" label="Logout" />
//                         </>)}
//                     </Tabs>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     )
// }

// export default Header
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Autocomplete, TextField, Tabs, Tab, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
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
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d2b" }}>
      <Toolbar>
        <Box width={'20%'}>
          <IconButton LinkComponent={Link} to="/">
            <MovieIcon />
          </IconButton>
        </Box>
        {/* Searchbar */}
        
        <Box width={'20%'} margin={'auto'}>
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
        <Box display={'flex'}>
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

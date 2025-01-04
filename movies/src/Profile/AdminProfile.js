// import { Box } from "@mui/system";
// import React, { Fragment, useEffect, useState } from "react";
// import { getAdminById } from "../api-helper/api_helper";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { List, ListItem, ListItemText, Typography } from "@mui/material";
// const AdminProfile = () => {
//   const [admin, setAdmin] = useState();
//   useEffect(() => {
//     getAdminById()
//       .then((res) => setAdmin(res.admin))
//       .catch((err) => console.log(err));
//   }, []);
//   return (
//     <Box width={"100%"} display="flex">
//       <Fragment>
//         {" "}
//         {admin && (
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
//               mt={1}
//               padding={1}
//               width={"auto"}
//               textAlign={"center"}
//               border={"1px solid #ccc"}
//               borderRadius={6}
//             >
//               Email: {admin.email}
//             </Typography>
//           </Box>
//         )}
//         {admin && admin.addedMovies.length > 0 && (
//           <Box width={"70%"} display="flex" flexDirection={"column"}>
//             <Typography
//               variant="h3"
//               fontFamily={"verdana"}
//               textAlign="center"
//               padding={2}
//             >
//               Added Movies
//             </Typography>
//             <Box
//               margin={"auto"}
//               display="flex"
//               flexDirection={"column"}
//               width="80%"
//             >
//               <List>
//                 {admin.addedMovies.map((movie, index) => (
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
//                       Movie: {movie.title}
//                     </ListItemText>
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

// export default AdminProfile;
import { Box, IconButton } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { getAdminById, deleteMovieById } from "../api-helper/api_helper"; // Add deleteMovieById API call
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { List, ListItem, ListItemText, Typography,  } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const AdminProfile = () => {
  const [admin, setAdmin] = useState();

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteMovie = (movieId) => {
    deleteMovieById(movieId)
      .then(() => {
        // Update the admin's movies after successful deletion
        setAdmin((prevAdmin) => ({
          ...prevAdmin,
          addedMovies: prevAdmin.addedMovies.filter(
            (movie) => movie._id !== movieId
          ),
        }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {admin && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />

            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email: {admin.email}
            </Typography>
          </Box>
        )}
        {admin && admin.addedMovies.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
            >
              Added Movies
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {admin.addedMovies.map((movie, index) => (
                  <ListItem
                    key={movie._id}
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Movie: {movie.title}
                    </ListItemText>
                    <IconButton
                      onClick={() => handleDeleteMovie(movie._id)}
                      color="error"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default AdminProfile;

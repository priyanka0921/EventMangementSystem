import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { getMovies } from "../../api-helper/api_helper";

export default function Tables() {
  const [movies, setMovies] = useState([]);

  // Fetch movie data on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <Box
      className="Table"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh", // Full viewport height
        backgroundColor: "#f9f9f9", // Light background for contrast
        padding: 2,
        margin: "-200px"
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: 2, fontWeight: "bold", color: "#333" }}
      >
        Recent Events
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0px 13px 20px 0px #80808029",
          width: "80%", // Width of the table
          maxWidth: "900px", // Max width of the table
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="movie table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Event
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Release Date
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Location
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "16px" }}
              >
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow
                key={movie._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell component="th" scope="row">
                  {movie.title}
                </TableCell>
                <TableCell align="left">
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="left">{movie.location}</TableCell>
                <TableCell align="left">{movie.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

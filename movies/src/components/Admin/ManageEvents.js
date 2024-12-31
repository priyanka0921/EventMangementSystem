// // import React, { useState } from "react";
// // import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// // import axios from "axios";

// // const ViewUserEvents = () => {
// //   const [userId, setUserId] = useState("");
// //   const [events, setEvents] = useState([]);
// //   const [error, setError] = useState(null);

// //   // Fetch events for the user by userId
// //   const fetchUserEvents = async () => {
// //     if (!userId) {
// //       setError("Please enter a valid User ID.");
// //       return;
// //     }

// //     try {
// //       const response = await axios.get(`/admin/user/${userId}/events`, {
// //         headers: {
// //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// //         },
// //       });
// //       setEvents(response.data.events);
// //       setError(null); // Reset error
// //     } catch (err) {
// //       setError("Failed to fetch events. Please check the user ID.");
// //       setEvents([]);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>View User's Events</h1>

// //       {/* Input Field for User ID */}
// //       <TextField
// //         label="User ID"
// //         variant="outlined"
// //         value={userId}
// //         onChange={(e) => setUserId(e.target.value)}
// //         style={{ marginBottom: "20px" }}
// //       />
// //       <Button variant="contained" color="primary" onClick={fetchUserEvents}>Fetch Events</Button>

// //       {/* Error Handling */}
// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {/* Display Events if available */}
// //       {events.length > 0 && (
// //         <TableContainer component={Paper}>
// //           <Table sx={{ minWidth: 650 }} aria-label="events table">
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell>Event Name</TableCell>
// //                 <TableCell>Event ID</TableCell>
// //                 <TableCell>Date</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {events.map((event) => (
// //                 <TableRow key={event._id}>
// //                   <TableCell>{event.title}</TableCell>
// //                   <TableCell>{event._id}</TableCell>
// //                   <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       )}
// //     </div>
// //   );
// // };

// // export default ViewUserEvents;
// import React, { useState } from "react";
// import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box } from "@mui/material";
// import axios from "axios";

// const ManageEvents = () => {
//   const [userId, setUserId] = useState("");
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null); // For modal details
//   const [open, setOpen] = useState(false); // Modal open/close state

//   // Fetch events for the user by userId
//   const fetchUserEvents = async () => {
//     if (!userId) {
//       setError("Please enter a valid User ID.");
//       return;
//     }

//     try {
//       const response = await axios.get(`/admin/user/${userId}/events`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setEvents(response.data.events);
//       setError(null); // Reset error
//     } catch (err) {
//       setError("Failed to fetch events. Please check the user ID.");
//       setEvents([]);
//     }
//   };

//   // Update event status
//   const updateEventStatus = async (eventId, currentStatus) => {
//     const newStatus = currentStatus === "Pending" ? "Approved" : "Pending"; // Toggle between Pending and Approved

//     try {
//       // Make the API call
//       await axios.put(
//         `/admin/events/status`,
//         { eventId, status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       // Update the event in the state
//       const updatedEvents = events.map((event) =>
//         event._id === eventId ? { ...event, status: newStatus } : event
//       );
//       setEvents(updatedEvents); // Update local state
//     } catch (err) {
//       setError("Failed to update event status.");
//     }
//   };

//   // Delete event
//   const deleteEvent = async (eventId) => {
//     try {
//       await axios.delete(`/admin/events/${eventId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       // Remove the deleted event from state
//       const updatedEvents = events.filter((event) => event._id !== eventId);
//       setEvents(updatedEvents);
//     } catch (err) {
//       setError("Failed to delete event.");
//     }
//   };

//   // Open event details modal
//   // const handleOpenDetails = (event) => {
//   //   setSelectedEvent(event);
//   //   setOpen(true);
//   // };

//   // Close event details modal
//   const handleCloseDetails = () => {
//     setOpen(false);
//     setSelectedEvent(null);
//   };

//   // Handle edit event
//   const handleEditEvent = async () => {
//     try {
//       await axios.put(
//         `/admin/events/${selectedEvent._id}`,
//         {
//           description: selectedEvent.description,
//           date: selectedEvent.date,
//           time: selectedEvent.time,
//           location: selectedEvent.location,
//           ticketInfo: selectedEvent.ticketInfo,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       // Optionally update the local events state after updating
//       const updatedEvents = events.map((event) =>
//         event._id === selectedEvent._id ? { ...event, ...selectedEvent } : event
//       );
//       setEvents(updatedEvents);

//       handleCloseDetails(); // Close modal after updating
//     } catch (err) {
//       setError("Failed to update event details.");
//     }
//   };

//   return (
//     <div>
//       <h1>View User's Events</h1>

//       {/* Input Field for User ID */}
//       <TextField
//         label="User ID"
//         variant="outlined"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//         style={{ marginBottom: "20px" }}
//       />
//       <Button variant="contained" color="primary" onClick={fetchUserEvents}>
//         Fetch Events
//       </Button>

//       {/* Error Handling */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Display Events if available */}
//       {events.length > 0 && (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="events table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Event Name</TableCell>
//                 <TableCell>Event ID</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Action</TableCell>
//                 <TableCell>Delete</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {events.map((event) => (
//                 <TableRow key={event._id}>
//                   <TableCell>{event.title}</TableCell>
//                   <TableCell>{event._id}</TableCell>
//                   <TableCell>{event.description}</TableCell>
//                   <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
//                   <TableCell>
//                     <span
//                       style={{
//                         color: event.status === "Pending" ? "red" : "green",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {event.status}
//                     </span>
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => updateEventStatus(event._id, event.status)}
//                     >
//                       {event.status === "Pending" ? "Approve" : "Set as Pending"}
//                     </Button>
//                   </TableCell>
//                   {/* <TableCell>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleOpenDetails(event)}
//                     >
//                       View Details
//                     </Button>
//                   </TableCell> */}
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       onClick={() => deleteEvent(event._id)}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Event Details Modal */}
//       <Modal open={open} onClose={handleCloseDetails}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "white",
//             padding: "20px",
//             width: "300px",
//             boxShadow: 24,
//           }}
//         >
//           {selectedEvent && (
//             <div>
//               <h3>Edit Event Details</h3>
//               <TextField
//                 label="Description"
//                 variant="outlined"
//                 fullWidth
//                 value={selectedEvent.description}
//                 onChange={(e) =>
//                   setSelectedEvent({ ...selectedEvent, description: e.target.value })
//                 }
//                 style={{ marginBottom: "10px" }}
//               />
//               <TextField
//                 label="Date"
//                 variant="outlined"
//                 fullWidth
//                 type="date"
//                 value={new Date(selectedEvent.date).toISOString().slice(0, 10)}
//                 onChange={(e) =>
//                   setSelectedEvent({ ...selectedEvent, date: e.target.value })
//                 }
//                 style={{ marginBottom: "10px" }}
//               />
//               <TextField
//                 label="Time"
//                 variant="outlined"
//                 fullWidth
//                 value={selectedEvent.time}
//                 onChange={(e) =>
//                   setSelectedEvent({ ...selectedEvent, time: e.target.value })
//                 }
//                 style={{ marginBottom: "10px" }}
//               />
//               <TextField
//                 label="Location"
//                 variant="outlined"
//                 fullWidth
//                 value={selectedEvent.location}
//                 onChange={(e) =>
//                   setSelectedEvent({ ...selectedEvent, location: e.target.value })
//                 }
//                 style={{ marginBottom: "10px" }}
//               />
//               <TextField
//                 label="Ticketing Info"
//                 variant="outlined"
//                 fullWidth
//                 value={selectedEvent.ticketInfo}
//                 onChange={(e) =>
//                   setSelectedEvent({ ...selectedEvent, ticketInfo: e.target.value })
//                 }
//                 style={{ marginBottom: "10px" }}
//               />
//               <Button variant="contained" color="primary" onClick={handleEditEvent}>
//                 Save Changes
//               </Button>
//             </div>
//           )}
//           <Button variant="contained" color="primary" onClick={handleCloseDetails}>
//             Close
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default ManageEvents;
import React, { useState } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Grid,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { approveEvent } from "../../api-helper/api_helper"; 

const ManageEvents = () => {
  const [userId, setUserId] = useState("");
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // For modal details
  const [open, setOpen] = useState(false); // Modal open/close state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar for success/error messages

  // Fetch events for the user by userId
  const fetchUserEvents = async () => {
    if (!userId) {
      setError("Please enter a valid User ID.");
      return;
    }

    try {
      const response = await axios.get(`/admin/user/${userId}/events`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEvents(response.data.events);
      setError(null); // Reset error
    } catch (err) {
      setError("Failed to fetch events. Please check the user ID.");
      setEvents([]);
    }
  };

  // Update event status
  const updateEventStatus = async (eventId, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Approved" : "Pending"; // Toggle between Pending and Approved

    try {
      await axios.put(
        `/admin/events/status`,
        { eventId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the event in the state
      const updatedEvents = events.map((event) =>
        event._id === eventId ? { ...event, status: newStatus } : event
      );
      setEvents(updatedEvents); // Update local state

      setSnackbarOpen(true); // Show success snackbar
    } catch (err) {
      setError("Failed to update event status.");
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Remove the deleted event from state
      const updatedEvents = events.filter((event) => event._id !== eventId);
      setEvents(updatedEvents);

      setSnackbarOpen(true); // Show success snackbar
    } catch (err) {
      setError("Failed to delete event.");
    }
  };

  // Open event details modal
  // const handleOpenDetails = (event) => {
  //   setSelectedEvent(event);
  //   setOpen(true);
  // };

  // Close event details modal
  const handleCloseDetails = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  // Handle edit event
  
  const handleEditEvent = async () => {
    try {
      // Update the event details first
      await axios.put(
        `/admin/events/${selectedEvent._id}`,
        {
          description: selectedEvent.description,
          date: selectedEvent.date,
          time: selectedEvent.time,
          location: selectedEvent.location,
          ticketInfo: selectedEvent.ticketInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
    
      const updatedEvents = events.map((event) =>
        event._id === selectedEvent._id ? { ...event, ...selectedEvent } : event
      );
      setEvents(updatedEvents);
  
      
      setTimeout(async () => {
        if (selectedEvent.status === "Pending") {
          
          const approvedEvent = await approveEvent(selectedEvent._id);
          console.log("approvedEvent",approvedEvent);
        
          const updatedEventsWithApproval = events.map((event) =>
            event._id === selectedEvent._id ? { ...event, status: "Approved" } : event
          );
          setEvents(updatedEventsWithApproval);
        }
      }, 1000); // Adjust the delay (1000 ms = 1 second) as needed
  
      handleCloseDetails(); // Close modal after editing
    } catch (err) {
      setError("Failed to update event details.");
    }
  };
  

  return (
    <Container maxWidth="lg" style={{ paddingTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Manage User's Events
      </Typography>

      {/* Input Field for User ID */}
      <Grid container spacing={2} alignItems="center" marginBottom={3}>
        <Grid item xs={12} sm={8}>
          <TextField
            label="Enter User ID"
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchUserEvents}
            fullWidth
            size="large"
          >
            Fetch Events
          </Button>
        </Grid>
      </Grid>

      {/* Error Handling */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Display Events if available */}
      {events.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table aria-label="events table">
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell>Event ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event._id}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{new Date(event.releaseDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        color: event.status === "Pending" ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => updateEventStatus(event._id, event.status)}
                    >
                      {event.status === "Pending" ? "Approve" : "Set as Pending"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteEvent(event._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: "20px" }}>
          No events found.
        </Typography>
      )}

      {/* Event Details Modal */}
      <Modal open={open} onClose={handleCloseDetails}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: "400px",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          {selectedEvent && (
            <div>
              <Typography variant="h6" gutterBottom>
                Edit Event Details
              </Typography>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={selectedEvent.description}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, description: e.target.value })
                }
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Date"
                variant="outlined"
                fullWidth
                type="date"
                value={new Date(selectedEvent.releaseDate).toISOString().slice(0, 10)} // Corrected key
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, releaseDate: e.target.value }) // Corrected key
                }
                style={{ marginBottom: "15px" }}
              />

              <TextField
                label="Time"
                variant="outlined"
                fullWidth
                value={selectedEvent.time}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, time: e.target.value })
                }
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                value={selectedEvent.location}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, location: e.target.value })
                }
                style={{ marginBottom: "15px" }}
              />
              <TextField
                label="Ticketing Info"
                variant="outlined"
                fullWidth
                value={selectedEvent.ticketInfo}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, ticketInfo: e.target.value })
                }
                style={{ marginBottom: "15px" }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleEditEvent}
                style={{ marginBottom: "15px" }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleCloseDetails}
              >
                Close
              </Button>
            </div>
          )}
        </Box>
      </Modal>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Action completed successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageEvents;

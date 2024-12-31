import axios from "axios";
//const API_BASE_URL = "http://localhost:5000";
export const getAllMovies = async () => {
    try {
        const response = await axios.get("/movie");
        if (response.status !== 200) {
            console.log("No Data Found");
            return;
        }
        const data = response.data;
        console.log("Fetched Data:", data); // Debugging: Check the response
        return data;
    } catch (err) {
        console.error("Error fetching movies:", err);
    }
};


export const getApprovedEvents = async () => {
    try {
      const response = await axios.get("/Event");
      if (response.status !== 200) {
        console.log("No Approved Events Found");
        return [];
      }
      return response.data.approvedEvents; // Return only the list of approved events
    } catch (err) {
      console.error("Error fetching approved events:", err);
      return [];
    }
  };
  

export const sendUserAuthRequest = async (data, signup) => {
    try {
        const res = await axios.post(`/users/${signup ? "signup" : "login"}`, {
            name: signup ? data.name : "",
            email: data.email,
            password: data.password,
        });

        if (res.status !== 200 && res.status !== 201) {
            throw new Error("Unexpected error occurred");
        }

        return res.data;
    } catch (err) {
        // Pass the error to the caller
        throw new Error(err.response?.data?.message || "User not found");
    }
};

export const sendAdminAuthRequest = async (data, login) => {
    const res = await axios
        .post("/admin/login", {
            email: data.email,
            password: data.password,
        })
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unexpectyed Error");
    }

    const resData = await res.data;
    return resData;
};
export const getMovieDetails = async (id) => {
    const res = await axios.get(`/movie/${id}`)
    .catch((err) => console.log(err));
    if (res.status !== 200) {
        return console.log("Unexpectyed Error");
    }
    const resData = await res.data;
    return resData;


}

export const getMoviesAndApprovedEvents = async () => {
  try {
    // Make the GET request to the backend endpoint
    const response = await axios.get('/Event');
    
    // Return the response data (movies and approved events)
    return response.data;
  } catch (error) {
    // Log any errors
    console.error("Error fetching movies and approved events", error);
    throw error; // Rethrow to handle it in the component
  }
};




export const newBooking = async (data) => {
    const res = await axios.post("/bookings", {
        movie: data.movie,
        seatNumber: data.seatNumber,
        date: data.date,
        user: localStorage.getItem("userId"),
        
    })
        .catch((err) => console.log(err));

    if (res.status !== 201) {
        return console.log("Unexpectyed Error");
    }
    const resData = await res.data;
    return resData;

}
export const getUserBooking = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios
        .get(`/bookings/${id}`)
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
};
export const getUserDetails = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
    if (res.status !== 200) {
        return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
};
export const deleteBooking = async (id) => {
    const res = await axios
        .delete(`/bookings/${id}`)
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unepxected Error");
    }

    const resData = await res.data;
    return resData;
};

export const addMovie = async (data) => {
    const res = await axios
      .post(
        "/movie",
        {
          title: data.title,
          description: data.description,
          postedUrl: data.postedUrl,
          releaseDate: data.releaseDate,
          location: data.location,
          actors: data.actors,
          featured: data.featured,
          price: data.price,
          admin: localStorage.getItem("adminId"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((err) => console.log(err));
  
    if (res.status !== 201) {
      console.log("Unexpected Error Occurred");
    }
  
    return res.data;
  };
  

export const getAdminById = async () => {
    const adminId = localStorage.getItem("adminId");
    const res = await axios
        .get(`/admin/${adminId}`)
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Unexpected Error Occurred");
    }

    const resData = await res.data;
    return resData;
};
export const getAllUsers = async () => {
    try {
        const response = await axios.get("/users");
        if (response.status === 200) {
            return response.data.users; // Directly return the users array
        } else {
            console.log("No data found");
            return [];
        }
    } catch (err) {
        console.error("Error fetching users:", err);
        return [];
    }
};



export const getMovies = async () => {
    try {
        const response = await axios.get("/movie");
        if (response.status === 200) {
            return response.data.movies; // Directly return the users array
        } else {
            console.log("No data found");
            return [];
        }
    } catch (err) {
        console.error("Error fetching users:", err);
        return [];
    }
};


export const createEvent = async (data) => {
    try {
      const res = await axios.post("/user/events", {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        time: data.time,
        location: data.location,
        ticketInfo: {  // Include ticket prices in ticketInfo
          premium: data.price.premium,
          royalClub: data.price.royalClub,
          executive: data.price.executive,
        },
        postedUrl: data.postedUrl,  // Add poster URL
        featured: data.featured,  // Add featured flag
        createdBy: localStorage.getItem("userId"),  // Assuming the userId is stored in localStorage
      });
  
      if (res.status !== 201) {
        console.log("Unexpected Error");
        return;
      }
  
      return res.data;  // Return the event data from the response
    } catch (err) {
      console.log(err);
      return null;  // Return null if there's an error
    }
  };
  
  export const getUserCreatedEvents = async (userId) => {
    try {
      const res = await axios.get(`/user/events/${userId}`);
      return res.data; // Return the response data (user details and events)
    } catch (err) {
      console.log(err);
      return null; // Return null if an error occurs
    }
  };


  export const deleteEvent = async (eventId) => {
    const userId = localStorage.getItem("userId");  // Or fetch it from wherever it's stored
  
    try {
      const res = await axios.delete(`/user/events/${eventId}`, {
        params: { userId },  // Pass the userId as a query parameter
      });
  //http://localhost:5000/user/events/67717d607e336e2c5ffcc796
      if (res.status === 200) {
        return res.data; // Return success message
      }
      return null;
    } catch (err) {
      console.error("Error withdrawing event:", err);
      return null;
    }
  };
  
//   export const getAllEvents = () => {
//     return axios.get(`/admin/events`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // Add JWT token for authentication
//       },
//     });
//   };
  
//   export const updateEventStatus = (eventId, status) => {
//     return axios.put(
//       `${API_BASE_URL}/admin/events/status`,
//       { eventId, status },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Add JWT token for authentication
//         },
//       }
//     );
//   };
//   export const deleteEventAdmin = (eventId) => {
//     return axios.delete(`${API_BASE_URL}/admin/events/${eventId}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // Add JWT token for authentication
//       },
//     });
//   };
// Example of API helper
export const getAllBookings = async () => {
    try {
        const response = await axios.get("http://localhost:5000/getAllBookings"); // Add the full backend URL
        if (response.status === 200) {
            return response.data.bookings; // Make sure you're accessing the correct field (`bookings`)
        } else {
            console.log("No bookings found");
            return [];
        }
    } catch (err) {
        console.error("Error fetching bookings:", err);
        return [];
    }
};

// export const getEventById = async (id) => {
//   const res = await axios.get(`/event/${id}`)
//   .catch((err) => console.log(err));
//   if (res.status !== 200) {
//       return console.log("Unexpectyed Error");
//   }
//   const resData = await res.data;
//   return resData;


// }
export 
const approveEvent = async (eventId) => {
  try {
    const response = await axios.put(`/${eventId}/approve`);
    console.log("Event approved:", response.data);
    return response.data; // Use this to update UI
  } catch (error) {
    console.error("Error approving event:", error);
  }
};

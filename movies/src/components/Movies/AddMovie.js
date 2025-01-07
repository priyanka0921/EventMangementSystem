
// import {
//   Box,
//   Button,
//   Checkbox,
//   FormLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import { addMovie } from "../../api-helper/api_helper";

// const labelProps = {
//   mt: 1,
//   mb: 1,
// };

// const AddMovie = () => {
//   const [inputs, setInputs] = useState({
//     title: "",
//     description: "",
//     postedUrl: "",
//     releaseDate: "",
//     location: "",
//     featured: false,
//     price: {
//       premium: "",
//       royalClub: "",
//       executive: "",
//     },
//   });
//   const [actors, setActors] = useState([]);
//   const [actor, setActor] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (["premium", "royalClub", "executive"].includes(name)) {
//       setInputs((prevState) => ({
//         ...prevState,
//         price: {
//           ...prevState.price,
//           [name]: value,
//         },
//       }));
//     } else {
//       setInputs((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Convert price fields to numbers
//     const formattedPrice = {
//       premium: Number(inputs.price.premium),
//       royalClub: Number(inputs.price.royalClub),
//       executive: Number(inputs.price.executive),
//     };

//     // Validate all fields before sending
//     if (
//       !inputs.title ||
//       !inputs.description ||
//       !inputs.postedUrl ||
//       !inputs.releaseDate ||
//       !inputs.location ||
//       !formattedPrice.premium ||
//       !formattedPrice.royalClub ||
//       !formattedPrice.executive
//     ) {
//       alert("Please fill all fields correctly.");
//       return;
//     }

//     // API call
//     addMovie({ ...inputs, price: formattedPrice, actors })
//       .then((res) => {
//         console.log("Movie added successfully:", res);
//         alert("Movie added successfully!");
//       })
//       .catch((err) => {
//         console.error("Failed to add movie:", err.response?.data || err.message);
//         alert("Failed to add movie. Please try again.");
//       });
//   };


//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Box
//           width={"50%"}
//           padding={10}
//           margin="auto"
//           display={"flex"}
//           flexDirection="column"
//           boxShadow={"10px 10px 20px #ccc"}
//         >
//           <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
//             Add New Event
//           </Typography>
//           <FormLabel sx={labelProps}>Title</FormLabel>
//           <TextField
//             value={inputs.title}
//             onChange={handleChange}
//             name="title"
//             variant="standard"
//             margin="normal"
//           />
//           <FormLabel sx={labelProps}>Description</FormLabel>
//           <TextField
//             value={inputs.description}
//             onChange={handleChange}
//             name="description"
//             variant="standard"
//             margin="normal"
//           />
//           <FormLabel sx={labelProps}>Poster URL</FormLabel>
//           <TextField
//             value={inputs.postedUrl}
//             onChange={handleChange}
//             name="postedUrl"
//             variant="standard"
//             margin="normal"
//           />
//           <FormLabel sx={labelProps}>Release Date</FormLabel>
//           <TextField
//             type={"date"}
//             value={inputs.releaseDate}
//             onChange={handleChange}
//             name="releaseDate"
//             variant="standard"
//             margin="normal"
//           />
//           <FormLabel sx={labelProps}>Location</FormLabel>
//           <Select
//             value={inputs.location}
//             onChange={(e) =>
//               setInputs((prevState) => ({
//                 ...prevState,
//                 location: e.target.value,
//               }))
//             }
//             name="location"
//             displayEmpty
//             variant="standard"
//             margin="normal"
//           >
//             <MenuItem value="">Select a Location</MenuItem>
//             <MenuItem value="Janta Maidan">Janta Maidan</MenuItem>
//             <MenuItem value="Baramunda">Baramunda</MenuItem>
//             <MenuItem value="Khandagiri">Khandagiri</MenuItem>
//             <MenuItem value="Ashok Nagar">Ashok Nagar</MenuItem>
//           </Select>
//           <FormLabel sx={labelProps}>Host</FormLabel>
//           <Box display={"flex"}>
//             <TextField
//               value={actor}
//               name="actor"
//               onChange={(e) => setActor(e.target.value)}
//               variant="standard"
//               margin="normal"
//             />
//             <Button
//               onClick={() => {
//                 setActors([...actors, actor]);
//                 setActor("");
//               }}
//             >
//               Add
//             </Button>
//           </Box>
//           <FormLabel sx={labelProps}>Featured</FormLabel>
//           <Checkbox 
//             name="featured"
//             checked={inputs.featured}
//             onClick={(e) =>
//               setInputs((prevState) => ({
//                 ...prevState,
//                 featured: e.target.checked,
//               }))
//             }
//             sx={{ mr: "50%", mt: "-40px" }}
//           />

//           {/* Price Section */}
//           <FormLabel sx={labelProps}>Price (Premium)</FormLabel>
//           <TextField
//             value={inputs.price.premium}
//             onChange={handleChange}
//             name="premium"
//             type="number"
//             variant="standard"
//             margin="normal"
//           />
//           <FormLabel sx={labelProps}>Price (Royal Club)</FormLabel>
//           <TextField
//             value={inputs.price.royalClub}
//             onChange={handleChange}
//             name="royalClub"
//             type="number"
//             variant="standard"
//             margin="normal"
//           />
//           <FormLabel sx={labelProps}>Price (Executive)</FormLabel>
//           <TextField
//             value={inputs.price.executive}
//             onChange={handleChange}
//             name="executive"
//             type="number"
//             variant="standard"
//             margin="normal"
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             sx={{
//               width: "30%",
//               margin: "auto",
//               bgcolor: "#2b2d42",
//               ":hover": {
//                 bgcolor: "#121217",
//               },
//             }}
//           >
//             Add New Movie
//           </Button>
//         </Box>
//       </form>
//     </div>
//   );
// };

// export default AddMovie;
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography, Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helper/api_helper";

const labelProps = {
  mt: 1,
  mb: 1,
};

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    postedUrl: "",
    releaseDate: "",
    location: "",
    featured: false,
    price: {
      premium: "",
      royalClub: "",
      executive: "",
    },
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["premium", "royalClub", "executive"].includes(name)) {
      setInputs((prevState) => ({
        ...prevState,
        price: {
          ...prevState.price,
          [name]: value,
        },
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedPrice = {
      premium: Number(inputs.price.premium),
      royalClub: Number(inputs.price.royalClub),
      executive: Number(inputs.price.executive),
    };

    if (
      !inputs.title ||
      !inputs.description ||
      !inputs.postedUrl ||
      !inputs.releaseDate ||
      !inputs.location ||
      !formattedPrice.premium ||
      !formattedPrice.royalClub ||
      !formattedPrice.executive
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    addMovie({ ...inputs, price: formattedPrice, actors })
      .then((res) => {
        console.log("Movie added successfully:", res);
        setSuccessSnackbarOpen(true);
        // Clear the form data
        setInputs({
          title: "",
          description: "",
          postedUrl: "",
          releaseDate: "",
          location: "",
          featured: false,
          price: {
            premium: "",
            royalClub: "",
            executive: "",
          },
        });
        setActors([]);
        setActor("");
        alert("Movie added successfully!");

      })

      .catch((err) => {
        console.error("Failed to add movie:", err.response?.data || err.message);
        alert("Failed to add movie. Please try again.");
      });
  };

  const handleCloseSnackbar = () => {
    setSuccessSnackbarOpen(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New Event
          </Typography>
          <FormLabel sx={labelProps}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.postedUrl}
            onChange={handleChange}
            name="postedUrl"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Release Date</FormLabel>
          <TextField
            type={"date"}
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Location</FormLabel>
          <Select
            value={inputs.location}
            onChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                location: e.target.value,
              }))
            }
            name="location"
            displayEmpty
            variant="standard"
            margin="normal"
          >
            <MenuItem value="">Select a Location</MenuItem>
            <MenuItem value="Janta Maidan">Janta Maidan</MenuItem>
            <MenuItem value="Baramunda">Baramunda</MenuItem>
            <MenuItem value="Khandagiri">Khandagiri</MenuItem>
            <MenuItem value="Ashok Nagar">Ashok Nagar</MenuItem>
          </Select>
          <FormLabel sx={labelProps}>Host</FormLabel>
          <Box display={"flex"} alignItems="center" mb={2}>
            <TextField
              value={actor}
              name="actor"
              onChange={(e) => setActor(e.target.value)}
              variant="standard"
              margin="normal"
              placeholder="Add a host"
            />
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Add
            </Button>
          </Box>
          <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
            {actors.map((host, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "15px",
                }}
              >
                <Typography variant="body2" sx={{ mr: 1 }}>
                  {host}
                </Typography>
                <Button
                  size="small"
                  onClick={() => {
                    setActors(actors.filter((_, i) => i !== index)); // Remove host from the list
                  }}
                >
                  ✕
                </Button>
              </Box>
            ))}
          </Box>


          {/* Price Section */}
          <FormLabel sx={labelProps}>Price</FormLabel>
          <Box display="flex" justifyContent="space-between">
            <TextField
              value={inputs.price.premium}
              onChange={handleChange}
              name="premium"
              type="number"
              variant="standard"
              placeholder="Premium"
              margin="normal"
            />
            <TextField
              value={inputs.price.royalClub}
              onChange={handleChange}
              name="royalClub"
              type="number"
              variant="standard"
              placeholder="Royal Club"
              margin="normal"
            />
            <TextField
              value={inputs.price.executive}
              onChange={handleChange}
              name="executive"
              type="number"
              variant="standard"
              placeholder="Executive"
              margin="normal"
            />
          </Box>

          {/* Featured Checkbox */}
          <Box mt={2}>
            <FormLabel sx={labelProps}>Featured</FormLabel>
            <Checkbox
              name="featured"
              checked={inputs.featured}
              onClick={(e) =>
                setInputs((prevState) => ({
                  ...prevState,
                  featured: e.target.checked,
                }))
              }
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add New Movie
          </Button>
        </Box>
      </form>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => handleCloseSnackbar()}
        message="Movie added successfully!"
      />
    </Box>
  );
};

export default AddMovie;

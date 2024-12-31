// import { Box, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react'
// import { getAllMovies } from '../../api-helper/api_helper';


// import MovieItem from '../Movies/MovieItem';

// const Events = () => {
//   const [movies, setMovies] = useState([]);
//   useEffect(() => {
//     getAllMovies().then((data) => setMovies(data.movies))

//       .catch(err => console.log(err));
//   }, [])
//   return (
//     <Box margin={'auto'} marginTop={4}>
//       <Typography variant='h4' margin={'auto'}
//         padding={2} textAlign={'center'} width={'40%'} bgcolor={"#920C3F"}
//         color='white'>
//         All Events
//       </Typography>

//       <Box margin={'auto'} padding={2} width={'100%'} display={'flex'} justifyContent={'flex-start'} flexWrap={"wrap"}>
//     {movies&&movies.map((movies,index)=><MovieItem key={index} id={movies._id} title={movies.title} releaseDate={movies.releaseDate} location={movies.location} postedUrl={movies.postedUrl} />)}
//       </Box>
//     </Box>
//   )
// }

// export default Events;



import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getMoviesAndApprovedEvents } from '../../api-helper/api_helper';
import MovieItem from '../Movies/MovieItem';

const Events = () => {
  const [movies, setMovies] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      try {
        // Fetching both movies and approved events
        const data = await getMoviesAndApprovedEvents();
        setMovies(data.movies); // Assuming the response contains movies
        setApprovedEvents(data.approvedEvents); // Assuming the response contains approved events
      } catch (err) {
        console.log("Error fetching movies and approved events:", err);
      }
    }, 1000); // Adjust the delay (1000 ms = 1 second) as needed
  }, []);

  // Merging movies and approved events and removing duplicates based on _id
  const mergedEvents = [
    ...movies,
    ...approvedEvents.filter(event => !movies.some(movie => movie._id === event._id))
  ];

  return (
    <Box margin={'auto'} marginTop={4}>
      <Typography
        variant='h4'
        margin={'auto'}
        padding={2}
        textAlign={'center'}
        width={'40%'}
        bgcolor={"#920C3F"}
        color='white'
      >
        All Events
      </Typography>

      <Box margin={'auto'} padding={2} width={'100%'} display={'flex'} justifyContent={'flex-start'} flexWrap={"wrap"}>
        {/* Render the merged and deduplicated list of events */}
        {mergedEvents && mergedEvents.map((event, index) => (
          <MovieItem
            key={index}
            id={event._id}
            title={event.title}
            releaseDate={event.releaseDate}
            location={event.location}
            postedUrl={event.postedUrl}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Events;
















// import { Box, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { getAllMovies, getApprovedEvents } from '../../api-helper/api_helper';
// import MovieItem from '../Movies/MovieItem';

// const Events = () => {
//   const [movies, setMovies] = useState([]);           // To store all movies
//   const [approvedMovies, setApprovedMovies] = useState([]); // To store approved movies

//   useEffect(() => {
//     const fetchMoviesData = async () => {
//       try {
//         // Fetch all movies and approved events concurrently
//         const [allMovies, approvedEvents] = await Promise.all([
//           getAllMovies(),         // Get all movies
//          // getApprovedEvents(),    // Get approved events
//         ]);
        
//         // Set movies state for all movies
//         setMovies(allMovies.movies || []); // Assuming `movies` is the key for all movies in the response
        
//         // Set approvedMovies state for approved events
//         setApprovedMovies(approvedEvents || []); // Assuming `approvedEvents` is the key for approved events in the response
//       } catch (err) {
//         console.log('Error fetching movies or approved events:', err);
//       }
//     };

//     fetchMoviesData();
//   }, []);
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString(); // Format it in the default locale format
//   };

//   return (
//     <Box margin={'auto'} marginTop={4}>
//       <Typography
//         variant='h4'
//         margin={'auto'}
//         padding={2}
//         textAlign={'center'}
//         width={'40%'}
//         bgcolor={"#920C3F"}
//         color='white'
//       >
//         All Events
//       </Typography>

//       {/* Displaying all movies */}
//       <Box margin={'auto'} padding={2} width={'100%'} display={'flex'} justifyContent={'flex-start'} flexWrap={"wrap"}>
//         {movies && movies.map((movie, index) => (
//           <MovieItem
//             key={index}
//             id={movie._id}
//             title={movie.title}
//             releaseDate={formatDate(movie.releaseDate)}
//             location={movie.location}
//             postedUrl={movie.postedUrl}
//           />
//         ))}
//       </Box>

//       {/* Displaying approved events */}
//       {/* <Typography
//         variant='h5'
//         margin={'auto'}
//         padding={2}
//         textAlign={'center'}
//         width={'40%'}
//         bgcolor={"#4CAF50"}
//         color='white'
//       >
//         Approved Events
//       </Typography> */}

//       <Box margin={'auto'} padding={2} width={'100%'} display={'flex'} justifyContent={'flex-start'} flexWrap={"wrap"}>
//         {approvedMovies && approvedMovies.map((movie, index) => (
//           <MovieItem
//             key={index}
//             id={movie._id}
//             title={movie.title}
//             releaseDate={movie.releaseDate}
//             location={movie.location}
//             postedUrl={movie.postedUrl}
//           />
//         ))}
//       </Box>
//     </Box>
//   );
// }

// export default Events;

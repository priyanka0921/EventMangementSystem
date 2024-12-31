const { decrypt } = require('dotenv');
const Bookings = require('../models/Bookings');
const jwt = require("jsonwebtoken");
const Movie = require('../models/Movie');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');
require("dotenv").config();
module.exports = function (app, err) {

    const newBooking = async (req, res, next) => {
        const { movie, date, seatNumber, user } = req.body;
      
        let existingMovie;
        let existingUser;
        try {
          existingMovie = await Movie.findById(movie);
          existingUser = await User.findById(user);
        } catch (err) {
          return console.log(err);
        }
        if (!existingMovie) {
          return res.status(404).json({ message: "Movie Not Found With Given ID" });
        }
        if (!user) {
          return res.status(404).json({ message: "User not found with given ID " });
        }
        let booking;
      
        try {
          booking = new Bookings({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user,
          });
          const session = await mongoose.startSession();
          session.startTransaction();
          existingUser.bookings.push(booking);
          existingMovie.bookings.push(booking);
          await existingUser.save({ session });
          await existingMovie.save({ session });
          await booking.save({ session });
          session.commitTransaction();
        } catch (err) {
          return console.log(err);
        }
      
        if (!booking) {
          return res.status(500).json({ message: "Unable to create a booking" });
        }
      
        return res.status(201).json({ booking });
      };
      
// const newBookings = async (req, res, next) => {
//     const { movie, date, seatNumber, user } = req.body;
//     let exsitingMovie;
//     let exsitingUser;
//     try {
//         exsitingMovie = await Movie.findById(movie);
//         exsitingUser = await User.findById(user);
//     } catch (err) {
//         return console.log(err);
//     }
//     if (!exsitingMovie) {
//         return res.status(404).json({ message: "Movie not found" });
//     }
//     if (!exsitingUser) {
//         return res.status(404).json({ message: "User not found" });
//     }

//     let booking;
//     try {
//         booking = new Bookings({
//             movie,
//             date: new Date(`${date}`),
//             seatNumber,
//             user
//         });
//         const session = await mongoose.startSession();
//         session.startTransaction();
//         exsitingUser.bookings.push(booking);
//         exsitingMovie.bookings.push(booking);
//         await exsitingUser.save({ session });
//         await exsitingMovie.save({ session });
//         await booking.save({ session });
//         session.commitTransaction();

//         // Populate the movie title after saving the booking
//         const populatedBooking = await booking.populate("movie", "title");

//         return res.status(201).json({ booking: populatedBooking });
//     } catch (err) {
//         return console.log(err);
//     }

// };

const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
      booking = await Bookings.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!booking) {
      return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ booking });
  };

// const getBookingsById = async (req, res, next) => {
//     const id = req.params.id;
//     let booking;

//     try {
//         // Fetch booking by ID and populate the `movie` and `user` fields
//         booking = await Bookings.findById(id)
//             .populate("movie", "title")  // Populate only the 'title' of the movie
            
//     } catch (err) {
//         console.log("Error fetching booking:", err);
//         return res.status(500).json({ message: "An error occurred while fetching the booking." });
//     }

//     if (!booking) {
//         return res.status(404).json({ message: "Booking not found" });
//     }

//     // Log the populated booking to verify the fields
//     console.log("Populated Booking:", booking);

//     return res.status(200).json({ booking });
// };


const deleteBooking=async(req,res,next)=>
{
    const id=req.params.id;
    let booking;
    try{
        booking=await Bookings.findByIdAndDelete(id).populate("user movie");
        console.log(booking);
       const session=await mongoose.startSession();
       session.startTransaction();
       
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.user.save({session});
        await booking.movie.save({session});
        session.commitTransaction();
    }
    catch(err){
        return console.log(err);
    }if (!booking) {
        return res.status(500).json({ message: "Unexpected error found" });  // If no users found, return an error
    }
    return res.status(200).json({message: "Succesfully Deleted " });

}
// In your bookings controller
// const getAllBookings = async (req, res) => {
//     try {
//         const bookings = await Bookings.find().populate("movie", "title");
//         res.status(200).json({
//             success: true,
//             bookings: bookings
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Error fetching bookings",
//             error: err.message
//         });
//     }
// };

const getAllBookings = async (req, res, next) => {
    let bookings;
    try {
        // Find all bookings and populate the movie's title field
        bookings = await Bookings.find()
            .populate("movie", "title") // Populate the `title` field from the `Movie` model
            .populate("user", "name email"); // Optional: Populate user details if needed
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Fetching bookings failed, please try again later." });
    }

    if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: "No bookings found." });
    }

    return res.status(200).json({
        success: true,
        bookings: bookings.map(booking => ({
            _id: booking._id,
            date: booking.date,
            seatNumber: booking.seatNumber,
            movie: booking.movie
                ? {
                      id: booking.movie._id,
                      title: booking.movie.title, // Extracting the title from the populated movie
                  }
                : null, // Handle cases where movie is null or undefined
            user: booking.user
                ? {
                      id: booking.user._id,
                      name: booking.user.name, // Extracting user name
                  }
                : null, // Handle cases where user is null or undefined
        })),
    });
};

// In your routes file
app.get('/getAllBookings', getAllBookings);




  app.delete("/bookings/:id",deleteBooking);//http://localhost:5000/delete/6766fcccdef3f7da6504dbcf
    app.post("/bookings", newBooking);//http://localhost:5000/bookings
    app.get("/booking/:id", getBookingById);
};
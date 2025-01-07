const { decrypt } = require('dotenv');
const Movie = require('../models/Movie');
const jwt = require("jsonwebtoken");
const { default: mongoose } = require('mongoose');
const Admin = require('../models/Admin');
const Event = require('../models/Event');
require("dotenv").config();
module.exports = function (app, err) {


    const addMovie = async (req, res, next) => {
        const extractedToken = req.headers.authorization.split(" ")[1];

        if (!extractedToken || extractedToken.trim() === "") {
            return res.status(404).json({ message: "Invalid Token" });
        }

        console.log(extractedToken);
        let adminId;
        // Verify token
        jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypt) => {
            if (err) {
                return res.status(404).json({ message: "Invalid Token" });
            } else {
                adminId = decrypt.id;
            }
        });

        // Extract data from request body
        const { title, description, releaseDate, location, time, postedUrl, featured, actors, price } = req.body;

        // Validate inputs
        if (
            !title ||
            title.trim() === "" ||
            !description ||
            description.trim() === "" ||
            !postedUrl ||
            postedUrl.trim() === "" ||
            !price ||
            typeof price.premium !== "number" ||
            typeof price.royalClub !== "number" ||
            typeof price.executive !== "number"
        ) {
            return res.status(422).json({ message: "Invalid Inputs" });
        }

        let movie;
        try {
            movie = new Movie({
                title,
                description,
                releaseDate: new Date(`${releaseDate}`),
                location,
                time,
                postedUrl,
                featured,
                actors,
                price: {
                    premium: price.premium,
                    royalClub: price.royalClub,
                    executive: price.executive,
                },
                admin: adminId,
            });

            const session = await mongoose.startSession();
            const adminUser = await Admin.findById(adminId);

            if (!adminUser) {
                return res.status(404).json({ message: "Admin not found" });
            }

            session.startTransaction();
            await movie.save({ session });
            adminUser.addedMovies.push(movie);
            await adminUser.save({ session });
            await session.commitTransaction();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Request to add movie failed" });
        }

        if (!movie) {
            return res.status(500).json({ message: "Movie creation failed" });
        }

        return res.status(201).json({ movie });
    };


    // const getAllMovies = async (req, res, next) => {
    //     let movies;
    //     try {
    //         movies = await Movie.find();
    //     } catch (err) {
    //         return console.log(err);
    //     }
    //     if (!movies) {
    //         return res.status(500).json({ message: "Request Fziled" })
    //     }
    //     return res.status(200).json({ movies });
    // }
    const getAllMovies = async (req, res, next) => {
        let movies;
        try {
            // Fetch all approved events
            const approvedEvents = await Event.find({ status: 'Approved' });

            // Check if any events are approved
            if (approvedEvents.length === 0) {
                return res.status(404).json({ message: "No approved events found" });
            }

            // Iterate over the approved events to add them to the Movie collection
            for (const event of approvedEvents) {
                // Check if the movie already exists in the database
                const movieExists = await Movie.findById(event._id);
                if (!movieExists) {
                    // If the movie doesn't exist, create and save the new movie
                    const movie = new Movie({
                        _id: event._id,  // Use the same ID as the event
                        title: event.title,
                        description: event.description,
                        actors: event.actors,
                        releaseDate: event.releaseDate,
                        time: event.time,
                        location: event.location,
                        postedUrl: event.postedUrl,
                        featured: event.featured,
                        price: {
                            premium: event.price.premium,
                            royalClub: event.price.royalClub,
                            executive: event.price.executive,
                        },
                        admin: event.createdBy, // Reference the admin who created the event
                    });

                    // Save the movie to the database
                    await movie.save();
                }
            }

            // Now, fetch all movies (including the newly added ones)
            movies = await Movie.find();

            return res.status(200).json({ movies });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error while fetching movies" });
        }
    };


    const getMovieIdById = async (req, res, next) => {
        const id = req.params.id;
        let movie;
        try {
            movie = await Movie.findById(id);
        }
        catch (err) {
            return console.log(err);
        }
        if (!movie) {
            return res.status(500).json({ message: "Request Invalid Movie Id" })
        }
        return res.status(200).json({ movie });
    }

    const getAllMoviesAndApprovedEvents = async (req, res, next) => {
        try {
            // Fetch all movies
            const movies = await Movie.find();

            const approvedEvents = await Event.find({ status: "Approved" });

            // If no movies or events are found, handle appropriately
            if (!movies.length && !approvedEvents.length) {
                return res.status(404).json({ message: "No movies or approved events found" });
            }

            return res.status(200).json({ movies, approvedEvents });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error while fetching data" });
        }
    };

    const approveEvent = async (req, res, next) => {
        const { id } = req.params; // Event ID

        try {
            // Fetch the event by ID
            const event = await Event.findById(id);

            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            // Update event status to "Approved"
            event.status = "Approved";

            // Save the updated event
            await event.save();

            // Create a movie using the event data
            const movie = new Movie({
                _id: event._id,  // Use the same ID as the event
                title: event.title,
                description: event.description,
                actors: event.actors,
                releaseDate: event.releaseDate,
                time: event.time,
                location: event.location,
                postedUrl: event.postedUrl,
                featured: event.featured,
                price: {
                    premium: event.price.premium,
                    royalClub: event.price.royalClub,
                    executive: event.price.executive,
                },
                admin: event.createdBy, // Reference the admin who created the event
            });

            // Save the movie
            await movie.save();

            return res.status(200).json({
                message: "Event approved and added to movies successfully",
                event,
                movie,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error while approving event" });
        }
    };



    app.put("/:id/approve", approveEvent);

    const deleteMovie = async (req, res) => {
        const movieId = req.params.id;

        try {
            // Find the movie by ID
            const movie = await Movie.findById(movieId);
            if (!movie) {
                return res.status(404).json({ message: "Movie not found" });
            }

            // Find the admin associated with the movie
            const admin = await Admin.findById(movie.admin);
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            // Remove the movie from the admin's addedMovies array
            admin.addedMovies.pull(movieId);
            await admin.save();

            // Delete the movie's bookings if they exist
            if (movie.bookings.length > 0) {
                await mongoose.model("Bookings").deleteMany({ _id: { $in: movie.bookings } });
            }

            // Delete the movie
            await movie.deleteOne();

            res.status(200).json({ message: "Movie deleted successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to delete movie" });
        }
    };


    app.delete("/movie/:id", deleteMovie);




    app.get("/Event", getAllMoviesAndApprovedEvents);
    app.get("/movie/:id", getMovieIdById); // For fetching a movie by ID
    app.post("/movie", addMovie);         // For adding a new movie
    app.get("/movie", getAllMovies);      // For fetching all movies  http://localhost:5000/movie

};
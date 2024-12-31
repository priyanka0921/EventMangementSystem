// routes/user_routes.js
const express = require("express");

const addMovie = require('../controllers/movie-controller');
const getAllMovies = require('../controllers/movie-controller');
const getMovieById = require('../controllers/movie-controller');
const getApprovedEvents = require('../controllers/movie-controller');
const approveEvent = require('../controllers/movie-controller');
module.exports = function (app, err) {
    const movieRouter = express.Router();

    // Define the route for fetching all users
    // movieRouter.get("/event/:id", getEventById);
movieRouter.get("/Event",getApprovedEvents)
    movieRouter.post("/", addMovie);
    movieRouter.get("/movie", getAllMovies); 
    movieRouter.get("/:id", getMovieById);//http://localhost:5000/6766c5510e253147e3fdc36d
movieRouter.put("/:id/approve", approveEvent);

    app.use("/movie", movieRouter);
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    actors: [
        {
            type: String,
        },
    ],
    releaseDate: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required:false,
      },
    location: {
        type: String,
        required: true,
    },
    postedUrl: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
    },
    bookings: [
        { 
            type: mongoose.Types.ObjectId,
            ref: "Bookings",
        },
    ],
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    
    price: {
        premium: {
            type: Number,
            required: true,
        },
        royalClub: {
            type: Number,
            required: true,
        },
        executive: {
            type: Number,
            required: true,
        },
    },
});

// Create the Movie model from the schema
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie; // Export the Movie model

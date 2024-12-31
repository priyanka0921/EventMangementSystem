// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingsSchema = new Schema({

    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
        required: true,

    },
    
    date: {
        type: Date,
        required: true,

    },
   
    seatNumber: {
        type: Number,
        required: true,

    },
   
   
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true,
    }

});

// Create the User model from the schema
const Bookings = mongoose.model('Bookings', bookingsSchema);

module.exports = Bookings;  // Export the User model

// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    bookings:[{
        type:mongoose.Types.ObjectId,
        ref:"Bookings",

    }],
    createdEvents: [{ type: mongoose.Schema.Types.ObjectId,
         ref: 'Event' }], 
    
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;  // Export the User model

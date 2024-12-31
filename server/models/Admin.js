// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
   
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
    addedMovies:[
    {
      type:mongoose.Types.ObjectId,
      ref:"Movie",

    }]
});

// Create the User model from the schema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;  // Export the User model

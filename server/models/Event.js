const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
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
      type: String, // Add actors field to align with movieSchema
    },
  ],
  releaseDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  postedUrl: {
    type: String, // Add postedUrl to include a poster/image for the event
    required: true,
  },
  featured: {
    type: Boolean, // Add featured field to highlight events
    default: false,
  },
  bookings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Bookings", // Reference to the Bookings model
    },
  ],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
},
  price: {
    premium: {
      type: Number, // Add price object for ticket pricing
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

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;

// routes/user_routes.js
const express = require("express");
const newBooking = require("../controllers/bookings-controller");
const getBookingById = require("../controllers/bookings-controller");
const deleteBooking = require("../controllers/bookings-controller");
const getAllBookings = require("../controllers/bookings-controller");
module.exports = function (app) {
  const bookingsRouter = express.Router();
bookingsRouter.get("/getAllBookings", getAllBookings);
  // Define routes
  bookingsRouter.post("/bookings", newBooking);
  bookingsRouter.get("/booking/:id", getBookingById);//http://localhost:5000/bookings/6766fcccdef3f7da6504dbcf
bookingsRouter.delete("/bookings/:id",deleteBooking);
  // Use the router with the prefix `/bookings`
  app.use("/bookings", bookingsRouter);
};

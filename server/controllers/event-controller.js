const Event = require("../models/Event");
const User = require("../models/User");
const mongoose = require("mongoose");
module.exports = function (app, err) {

  const createEvent = async (req, res) => {
    const {
      title,
      description,
      releaseDate,
      time,
      location,
      ticketInfo,  // Assuming ticketInfo includes the price object
      postedUrl,   // URL for the event poster
      featured,    // Boolean for featured events
    } = req.body;

    const userId = req.body.createdBy;

    console.log("Received userId:", userId);

    try {
      // Validate user existence
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (!ticketInfo || !ticketInfo.premium || !ticketInfo.royalClub || !ticketInfo.executive) {
        return res.status(400).json({
          message: "Ticket information is incomplete. Please provide premium, royalClub, and executive prices.",
        });
      }

      // Ensure ticketInfo contains the correct structure for the price fields
      const { premium, royalClub, executive } = ticketInfo;

      // Create the event with the price fields correctly mapped
      const newEvent = new Event({
        title,
        description,
        releaseDate: new Date(releaseDate), // Convert to Date object
        time,
        location,
        postedUrl,
        featured,
        price: {
          premium,
          royalClub,
          executive,
        },
        createdBy: userId,
      });

      // Save the new event
      await newEvent.save();

      // Push the new event to the user's createdEvents array
      user.createdEvents.push(newEvent._id);
      await user.save();

      // Respond with the created event
      res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create event" });
    }
  };



  const getAllEvents = async (req, res) => {
    const userId = req.params.id;

    // Ensure the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    try {
      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find all events created by this user
      const events = await Event.find({ createdBy: userId });

      // Count the number of events
      const eventCount = events.length;

      // Respond with user details and event count
      res.status(200).json({
        user: {
          ...user.toObject(),
          eventCount, // Add the event count to the user data
        },
        events, // Include detailed events with ticketInfo, featured, etc.
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  };


  const deleteEvent = async (req, res) => {
    const eventId = req.params.id;

    try {
      // Find the event by ID
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Find the user who created the event
      const user = await User.findById(event.createdBy);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove the event from the user's created events array
      user.createdEvents.pull(eventId);
      await user.save();

      // Delete the event from the database
      await event.deleteOne();

      // Send success response
      res.status(200).json({ message: "Event withdrawn successfully" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to withdraw event" });
    }
  };


  const getAllEventsForAdmin = async (req, res) => {
    try {
      const events = await Event.find();

      // Respond with all events
      res.status(200).json({ events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  };



  const updateEventStatus = async (req, res) => {
    const { eventId, status } = req.body;

    console.log("Received eventId:", eventId); // Log eventId to check what you're passing
    console.log("Received status:", status); // Log status to check the value

    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Log the current status before updating
      console.log("Current Event Status:", event.status);

      // Update the event status
      event.status = status;
      await event.save();

      // Log the updated status
      console.log("Updated Event Status:", event.status);

      res.status(200).json({ message: "Event status updated", event });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update event status" });
    }
  };



  const deleteEventAdmin = async (req, res) => {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      const user = await User.findById(event.createdBy);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.createdEvents.pull(eventId);
      await user.save();

      await event.deleteOne();

      res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete event" });
    }
  };

  const getEventsByUser = async (req, res) => {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const events = await Event.find({ createdBy: userId });

      if (events.length === 0) {
        return res.status(404).json({ message: "No events found for this user" });
      }

      res.status(200).json({ events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  };












  // Correct route definition for admin to view events of a user
  app.get('/admin/user/:userId/events', getEventsByUser);

  app.delete('/admin/events/:id', deleteEventAdmin);

  //http://localhost:5000/admin/events/677066f797063fed924b613b

  // Route for updating event status
  app.put('/admin/events/status', updateEventStatus);

  // Route for getting all events (admin view)
  app.get('/admin/events', getAllEventsForAdmin);



  // Example route for deleting an event
  app.delete('/user/events/:id', deleteEvent);

  app.post("/user/events", createEvent);
  app.get("/user/events/:id", getAllEvents);

}
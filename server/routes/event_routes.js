const express=require("express");
const createEvent =require('../controllers/event-controller');
const getAllEvents=require('../controllers/event-controller');
const getAllEventsForAdmin=require('../controllers/event-controller');
 const getEventsByUser=require('../controllers/event-controller');
const updateEventStatus=require('../controllers/event-controller');
//const getEventById=require('../controllers/event-controller');

const deleteEvent=require('../controllers/event-controller');
const deleteEventAdmin=require('../controllers/event-controller');
module.exports=function(app,err)
{
    const eventRouter=express.Router();
    eventRouter.post("/user/events", createEvent);
    eventRouter.get("/user/events/:id", getAllEvents);
    eventRouter.delete("/user/events/:id", deleteEvent);

// FOR admin 
    eventRouter.delete("/admin/events/:id", deleteEventAdmin);
    eventRouter.get("/admin/events", getAllEventsForAdmin);
    eventRouter.put("/admin/events/status", updateEventStatus);
eventRouter.get("/admin/user/:userId/events", getEventsByUser);
//http://localhost:5000/admin/user/6769b688425e97c9b8bba727/events

//eventRouter.get("/event/:id", getEventById);


    app.use("/",eventRouter);
}

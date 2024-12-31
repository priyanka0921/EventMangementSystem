// routes/user_routes.js
const express = require("express");
const getAllUsers = require('../controllers/user-controller');  // Import the getAllUsers function
const signup = require('../controllers/user-controller');
const updateUser = require('../controllers/user-controller');
const deleteUser = require('../controllers/user-controller');
const login = require('../controllers/user-controller');
const getBookingsOfUser = require('../controllers/user-controller');
const getUserById = require('../controllers/user-controller');

 const googleLogin = require('../controllers/user-controller');
module.exports = function (app, err) {
    const userRouter = express.Router();

    // Define the route for fetching all users
    userRouter.get("/users", getAllUsers);  // Use the imported function as the route handler
    userRouter.post("/users/signup", signup);
    userRouter.put("/:id", updateUser);
    userRouter.delete("/delete/:id", deleteUser);
    userRouter.get("/bookings/:id", getBookingsOfUser);
    userRouter.post("/login", login);
    userRouter.get("user/:id",getUserById);


    userRouter.post("/users/google-login", googleLogin);

    // Use the userRouter for the "/users" route
    app.use("/users", userRouter);
};
 
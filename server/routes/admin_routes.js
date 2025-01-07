// routes/user_routes.js
const express = require("express");

const addAdmin = require('../controllers/admin-controller');
// const updateUser = require('../controllers/admin-controller');
const getAdmins = require('../controllers/admin-controller');
const adminLogin = require('../controllers/admin-controller');
const getAdminById = require('../controllers/admin-controller');
module.exports = function (app, err) {
    const adminRouter = express.Router();


    adminRouter.get("/admin/:id", getAdminById);
    adminRouter.post("/signup", addAdmin);

    adminRouter.get("/admin", getAdmins);//http://localhost:5000/admin
    adminRouter.post("/login", adminLogin);

    app.use("/admin", adminRouter);
};

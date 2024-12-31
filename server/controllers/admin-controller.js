const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (app, err) {

    const addAdmin = async (req, res, next) => {
        const { email, password } = req.body;
        if (

            !email && email.trim() === "" &&
            !password && password.trim() === "") {
            return res.status(422).json({ message: "Invalid Inputs" });
        }



        let existingAdmin;
        try {
            existingAdmin = await Admin.findOne({ email });
        } catch (err) {
            return console.log(err);
        }

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        let admin;

        try {
            admin = new Admin({ email, password: hashedPassword });
            admin = await admin.save();
        } catch (err) {
            return console.log(err);
        }
        if (!admin) {
            return res.status(500).json({ message: "Unable to store admin" });  // If no users found, return an error
        }
        return res.status(201).json({ admin });


    }
    const adminLogin = async (req, res, next) => {
        const { email, password } = req.body;
        if (!email && email.trim() === "" &&
            !password && password.trim() === "") {
            return res.status(422).json({ message: "Invalid Inputs" });
        }
        let existingAdmin;
        try {
            existingAdmin = await Admin.findOne({ email });
        }
        catch (err) {
            return console.log(err);
        }
        if (!existingAdmin) {
            return res.status(400).json({ message: "Admin not found" });  // If no users found, return an error
        }

        const isPasswordCorrect = bcrypt.compareSync(
            password,
            existingAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Pasword is wrong found" });
        }
        const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, { expiresIn: "7d", });

        //.toString()
        return res.status(200).json({ message: "Authentcation Completed", token, id: existingAdmin._id });

    }
    const getAdmins = async (req, res, next) => {
        let admins;
        try {
            // Fetch all users from the database using Mongoose's find() method
            admins = await Admin.find();
        } catch (err) {
            return console.log(err);
        }
        if (!admins) {
            return res.status(500), json({ message: "Internal Server Error " })
        }
        return res.status(200).json({ admins });
    }
    const getAdminById = async (req, res, next) => {
        const id = req.params.id;

        let admin;
        try {
            admin = await Admin.findById(id).populate("addedMovies");
        } catch (err) {
            return console.log(err);
        }
        if (!admin) {
            return console.log("Cannot find Admin");
        }
        return res.status(200).json({ admin });
    };
    app.get("/admin/:id", getAdminById);


    app.get("/admin", getAdmins);
    app.post("/admin/signup", addAdmin);//http://localhost:5000/admin/signup
    app.post("/admin/login", adminLogin);
};
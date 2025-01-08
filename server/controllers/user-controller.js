// controllers/user-controller.js
const Bookings = require("../models/Bookings");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = function (app, err) {
  // Define the route handler for getting all users
  const getAllUsers = async (req, res, next) => {
    let users;
    try {
      // Fetch all users from the database using Mongoose's find() method
      users = await User.find();
    } catch (err) {
      return next(err);  // Pass any errors to the next middleware
    }
    if (!users) {
      return res.status(500).json({ message: "Unexpected error found" });  // If no users found, return an error
    }
    return res.status(200).json({ users });  // Send the list of users as a JSON response
  };

  const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (
      !name && name.trim() === "" &&
      !email && email.trim() === "" &&
      !password && password.trim() === "") {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    const hashPassword = bcrypt.hashSync(password);

    let user;
    try {
      user = new User({ name, email, password: hashPassword });
      user = await user.save();
    } catch (err) {
      return next(err);  // Pass any errors to the next middleware
    }
    if (!user) {
      return res.status(500).json({ message: "Unexpected error found" });  // If no users found, return an error
    }
    return res.status(201).json({ id: user._id });
  }
  const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (
      !name && name.trim() === "" &&
      !email && email.trim() === "" &&
      !password && password.trim() === "") {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try {
      user = await User.findByIdAndUpdate(id,
        { name, email, password: hashedPassword });
    }
    catch (err) {
      return console.log(err);

    }
    if (!user) {
      return res.status(500).json({ message: "SomethingWent wrong" });
    }
    return res.status(200).json({ message: "Update succesfully" });
  }


  const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
      user = await User.findByIdAndDelete(id);
    }
    catch (err) {
      return console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "Something Went wrong" });
    }
    return res.status(200).json({ message: "Delete succesfully" });

  }

  const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && email.trim() === "" && !password && password.trim() === "") {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return console.log(err);
    }

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Unable to find user from this ID" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    return res
      .status(200)
      .json({ message: "Login Successful", id: existingUser._id.toString() });

  };

  const getBookingsOfUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
      bookings = await Bookings.find({ user: id })
        .populate("movie")
        .populate("user");
    } catch (err) {
      return console.log(err);
    }
    if (!bookings) {
      return res.status(500).json({ message: "Unable to get Bookings" });
    }
    return res.status(200).json({ bookings });
  };

  const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
      user = await User.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "Unexpected Error Occured" });
    }
    return res.status(200).json({ user });
  };


//Google Sign in 
const googleLogin = async (req, res, next) => {
  const { email, name } = req.body;

  // Validate inputs
  if (!email || !name || email.trim() === "" || name.trim() === "") {
    return res.status(422).json({ message: "Invalid inputs." });
  }

  let existingUser;

  try {
    // Check if the user already exists
    existingUser = await User.findOne({ email :email.toLowerCase()});
  } catch (err) {
    return res.status(500).json({ message: "Database query failed." });
  }

  if (existingUser) {
    // If the user exists, return a success message
    return res.status(200).json({
      message: "User logged in successfully via Google.",
      id: existingUser._id,
      user: existingUser,
    });
  }

  // If the user doesn't exist, create a new user
  const newUser= new User({
    name, email:email.toLowerCase(), password: null
  })
  const savedUser= await newUser.save();
  return res.status(201).json({
    message: "User created successfully via Google.",
    id: savedUser._id,
    user: savedUser,
  });
}


app.post("/users/google-login", googleLogin);





const facebookLogin = async (req, res, next) => {
  const { email, name } = req.body;

  // Validate inputs
  if (!email || !name || email.trim() === "" || name.trim() === "") {
      return res.status(422).json({ message: "Invalid inputs." });
  }

  let existingUser;

  try {
      // Check if the user already exists
      existingUser = await User.findOne({ email: email.toLowerCase() });
  } catch (err) {
      return res.status(500).json({ message: "Database query failed." });
  }

  if (existingUser) {
      // If the user exists, return a success message
      return res.status(200).json({
          message: "User logged in successfully via Facebook.",
          id: existingUser._id,
          user: existingUser,
      });
  }

  // If the user doesn't exist, create a new user
  const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: null, // For OAuth-based logins like Google/Facebook, no password is needed
  });

  const savedUser = await newUser.save();
  return res.status(201).json({
      message: "User created successfully via Facebook.",
      id: savedUser._id,
      user: savedUser,
  });
};

// API endpoint to handle Facebook login
app.post("/users/facebook-login", facebookLogin);


const setPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(422).json({ message: "Email or Password is missing." });
  }

  try {
      let user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
      console.error("Error updating password:", err);
      res.status(500).json({ message: "Error updating password." });
  }

};

// Route to handle password update
app.post("/users/set-password", setPassword);



app.post("/users/set-password", setPassword);


const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
      // Find the user by userId
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      // Return the user details (including their Google/Facebook data)
      return res.status(200).json({
          message: "User found.",
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
              password: user.password ? "Password set" : "Password not set",
              googleAuth: user.googleAuth ? user.googleAuth : null,
              facebookAuth: user.facebookAuth ? user.facebookAuth : null,
              bookings: user.bookings,
              createdEvents: user.createdEvents,
          },
      });
  } catch (error) {
      return res.status(500).json({ message: "Failed to fetch user details." });
  }
};

app.get("/users/:userId/details", getUserDetails);



  app.get("/user/:id", getUserById)
  app.get("/bookings/:id", getBookingsOfUser)
  app.post("/users/login", login) //     http://localhost:5000/login priyanka dash pwd suku@21
  app.get("/users", getAllUsers);//http://localhost:5000/users
  app.post("/users/signup", signup);//http://localhost:5000/signup
  app.put("/:id", updateUser);//http://localhost:5000/userid   use put then chane the data then send 
  app.delete("/delete/:id", deleteUser);//http://localhost:5000/6765da4543fe2371ee04ded4
};

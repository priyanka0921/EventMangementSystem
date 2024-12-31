// index.js
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
//app.use(cors());
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

app.use(express.json());

app.use(cookieParser());

// Import and use the controller and routes
require('./controllers/user-controller.js')(app, {});
require('./controllers/admin-controller.js')(app, {});
require('./controllers/movie-controller.js')(app, {});
require('./controllers/bookings-controller.js')(app, {});
require('./routes/user_routes.js')(app, {});

require('./routes/admin_routes.js')(app, {});
require('./routes/movie_routes.js')(app, {});
require('./routes/bookings_routes.js')(app, {});
require('./controllers/event-controller.js')(app,{});
require('./routes/event_routes.js')(app, {});

mongoose
  .connect('mongodb+srv://dbUser:dbUserPwd@clusterhyscaler1.xrcmx.mongodb.net/')
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));



const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

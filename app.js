const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // for MongoDB session store
// Include routes
const taskRouter = require("./routes/task.js");
const userRouter = require("./routes/user.js");

require("dotenv").config();
require("./config/passport");

const app = express();

app.use(passport.initialize());

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Getting cors error when made api from angular app for post api's but not postman.
app.use(cors());

// For session management
app.use(
  session({
    secret: "your-secret-key", // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({
    //   mongoUrl: "mongodb://127.0.0.1:27017/toDoListDB",
    //   collection: "mySessions",
    // }),
    cookie: { secure: false, maxAge: 3600000 }, // Set secure to true if you're using HTTPS
  })
);

app.use("/tasks", taskRouter)

// app.use('/users', passport.authenticate('jwt',{session:false})); --- this wasted hours of time.

app.use("/users", userRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON THE PORT ${PORT}...`);
});

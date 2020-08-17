const PORT = process.env.PORT || 3010;
const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();
// Import ROUTES
const postsRoute = require("./routes/posts.js");
const bodyparser = require("body-parser");
const cors = require("cors");

//MIDDLEwares
app.use(cors());
app.use(bodyparser.json()); // Whenever any route is hit, this middleware is triggered

app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.send("This is root");
});

// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, connectTimeoutMS: 1000 },
  (error) => {
    console.log("Connected to DB!");
  }
);

//LISTENING...
app.listen(PORT, () => {
  console.log("Listening to port.. 3010");
});

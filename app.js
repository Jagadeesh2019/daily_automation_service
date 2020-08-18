const PORT = process.env.PORT || 3010;
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv/config");
const app = express();
// Import ROUTES
const postsRoute = require("./routes/posts.js");
const indexRouter = require("./routes/index.js");
const wmsRouter = require("./routes/wms_ui.js");
const dailyRouter = require("./routes/daily.js");
const resellerRouter = require("./routes/reseller_ui.js");
const mokamRouter = require("./routes/mokam_ui.js");
const redxRouter = require("./routes/redx_ui.js");
const storesRouter = require("./routes/stores_ui.js");
const cors = require("cors");

//MIDDLEwares
app.use(cors());
app.use(bodyparser.json()); // Whenever any route is hit, this middleware is triggered

app.use("/posts", postsRoute);

app.use("/", indexRouter);

app.use("/wms", wmsRouter);

app.use("/daily", dailyRouter);

app.use("/reseller", resellerRouter);

app.use("/mokam", mokamRouter);

app.use("/redx", redxRouter);

app.use("/stores", storesRouter);

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

// Menoko App server
// dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

// middleware
app.use(express.json());
mongoose.set("strictQuery", true);
app.use(morgan("dev"));

mongoose.connect(process.env.DB_CONNECTION_STRING, (err) => {
  console.log("connected to database", err);
});

// routes
app.use("/api/posts", require("./routes/postRouter"))

app.use("/", require("./routes/postRouter"))

//error handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.send({ errMsg: err.message });
});


// server start
const PORT = 5500
app.listen(PORT, () => {
  console.log("server is running dude on 5500!");
});
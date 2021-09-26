// modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");

// app setup
const app = express();
app.use(morgan("combined"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// routes
app.get(['/', '/home', 'inicio', 'index'], function (req, res) { 
  res.render('index');
});

// run the server
var listener = app.listen(process.env.PORT || 80, function () {
  console.log("listening on port " + listener.address().port);
});

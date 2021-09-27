// modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");

// app setup
const app = express();
//app.use(morgan("combined"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes

// home 
app.get(['/', '/home', 'inicio', 'index'], function (req, res) { 
  
  res.render('index');
});

// results
app.post('/results', function(req, res) {

  console.log("req.params.user");
  console.log(req.body.user);

});

// run the server
var listener = app.listen(process.env.PORT || 80, function () {
  console.log("listening on port " + listener.address().port);
});

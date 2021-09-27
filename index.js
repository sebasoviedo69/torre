// modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const jimp = require("jimp");

const info = {
  id: "",
  type: ""

};

// app setup
const app = express();
//app.use(morgan("combined"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// generate image
async function ProcessImage(info) {
  const imgName = info.id + '_result.png';
  const imgReadPath = path.join(__dirname, 'public/imgs/');
  const imgSavePath = path.join(__dirname, 'public/imgs/result/', imgName);
  const srcImgPath = path.join('/imgs/result/', imgName);

  const image = await jimp.read(path.join(imgReadPath, info.type));
  
  image.blur(2, function(err){
    if (err) throw err;
  })
  .write(imgSavePath);

  return srcImgPath;
}

// routes

// home 
app.get(['/', '/home', 'inicio', 'index'], function (req, res) {   
  res.render('index');
});

// results
app.post('/results', async function(req, res){

  const userInfo = Object.create(info);
  userInfo.id = req.body.user.id;
  userInfo.type = "mu-alien.jpg";

  var imgPath = await ProcessImage(userInfo);
  console.log(imgPath);
  res.render('results', {imgPath: imgPath});
});

// run the server
var listener = app.listen(process.env.PORT || 80, function () {
  console.log("listening on port " + listener.address().port);
});

// modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request-promise-native");
const jimp = require("jimp");

const info = {
  id: "",
  picture: ""

};

// app setup
const app = express();
//app.use(morgan("combined"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// get user picture from torre
async function GetUserInfo(userId) {
  var torreUrl = 'https://torre.bio/api/bios/'
  var result = await request(torreUrl+userId);
  var res = JSON.parse(result);

  return res.person.picture;
}

// generate image
async function ProcessImage(info) {

  const imgName = info.id + '_result.png';
  const imgReadPath = info.picture;
  const imgSavePath = path.join(__dirname, 'public/imgs/result/', imgName);
  const srcImgPath = path.join('/imgs/result/', imgName);
  const image = await jimp.read(imgReadPath);
  image.blur(8, function(err){
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

  if (userInfo.id != undefined){
    
    userInfo.picture = await GetUserInfo(userInfo.id);
    var imgPath = await ProcessImage(userInfo);
    res.render('results', {imgPath: imgPath});
  }
});

// run the server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("listening on port " + listener.address().port);
});

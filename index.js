// modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const jimp = require("jimp");
//const fetch = require("node-fetch");

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


async function GetUserInfo(userId) {

  /*fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));*/
  var userPictureUrl = "https://res.cloudinary.com/torre-technologies-co/image/upload/v0/origin/starrgate/users/profile_c68ab3f19fa618f6b0ead245ad5b67482830d68f.jpg";
  console.log(userPictureUrl);
  return userPictureUrl;
}

// generate image
async function ProcessImage(info) {

  const imgName = info.id + '_result.png';
  const imgReadPath =  await GetUserInfo(info.id)
  const imgSavePath = path.join(__dirname, 'public/imgs/result/', imgName);
  const srcImgPath = path.join('/imgs/result/', imgName);


    const image = await jimp.read(imgReadPath);
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
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("listening on port " + listener.address().port);
});

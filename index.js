// modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
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
  var pictureUrl = "https://res.cloudinary.com/torre-technologies-co/image/upload/v0/origin/starrgate/users/profile_c68ab3f19fa618f6b0ead245ad5b67482830d68f.jpg";
  
  request(torreUrl+userId, function (error, response, body){

    body = JSON.parse(body);
    console.log(userId);

    if(body.code !== undefined && body.code == "011002"){
      return res.json({"success": false, "msg": "Error, user not found."});
    }else{ 
      pictureUrl = body.person.picture;
      //return pictureUrl;
    }
  });
  return pictureUrl;

}

// generate image
async function ProcessImage(info) {

  const imgName = info.id + '_result.png';
  const imgReadPath = info.picture;
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

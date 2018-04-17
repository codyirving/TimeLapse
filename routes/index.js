var express = require('express');
var router = express.Router();
//Client ID
var clientId = 'b131c17cf8131dd';
//Client Secret
// 9b3da4d90d31dd7b5e2fa66622ff0dc21c06d2c5



var gifshot = require('gifshot');
var imgur = require('imgur');
var http = require("https");



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("START");
  gifshot.createGIF({
    'images': ['https://i.imgur.com/7xhEDL1.jpg','https://i.imgur.com/XVbL4Vb.jpg','https://i.imgur.com/gQ56HzK.jpg']
}, function(obj) {
        console.log("MIDDLE");
        if(!obj.error) {
          var image = obj.image;
          console.log(image);
          //animatedImage = document.createElement('img');
          //animatedImage.src = image;
          //document.body.appendChild(animatedImage);
          imgur.setClientId(clientId);
          imgur.setAPIUrl('https://api.imgur.com/3/');
          imgur.uploadBase64(image).then(function (json) {
            console.log("SUCCESS");
            console.log(json.data.link);
          }).catch(function (err) {
            console.log("ERROR");
            console.error(err.message);
        });
        console.log("DONE");
          
        }else console.log("object error: " + obj.errorMsg);
});



  res.render('index', { title: 'Express' });
});

module.exports = router;

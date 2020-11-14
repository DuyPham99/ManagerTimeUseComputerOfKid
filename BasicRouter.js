var express = require('express');
var app = express();
const path = require('path');
const router = express.Router();
var fs = require('fs');
var prepend = require('prepend');

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/data', function (req, res) {
  var data = fs.readFileSync('data.txt');
  var array = data.toString().split('\n');
  res.send(array);
});


router.get('/start', function (req, res) {
  var day = new Date().getDate();
  var month =  new Date().getMonth();
  var year =  new Date().getFullYear();
  var date = day + "/" + month + "/" + year;
  var hours = new Date().getHours();
  var minutes = new Date().getMinutes();

  var writeFile = date + " " + hours + ":" + minutes + " " + "null" + " " + "null" + " " + "start";

  prepend(__dirname + '/data.txt', writeFile, function(error) {
    if (error)
        console.error(error.message);
  });
  res.redirect('/');
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');


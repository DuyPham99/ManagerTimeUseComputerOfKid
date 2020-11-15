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
  if(data.length != 0) res.send(array);
});

router.get('/start', function (req, res) {
  var day = new Date().getDate();
  var month =  new Date().getMonth() + 1;
  var year =  new Date().getFullYear();
  var date = day + "/" + month + "/" + year;
  var hours = new Date().getHours();
  var minutes = new Date().getMinutes();
  var seconds = new Date().getSeconds();
  if (minutes < 10) minutes = "0" + minutes;
  if (hours < 10) hours = "0" + hours;
  if (seconds < 10) seconds = "0" + seconds;
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  var writeFile = date + " " + hours + ":" + minutes + ":" + seconds + " " + "null" + " " + "null" + " " + "start";

  prepend(__dirname + '/data.txt', writeFile, function(error) {
    if (error)
        console.error(error.message);
  });

  res.redirect('/');
});

router.get('/end', function (req, res) {

  var endTime = req.query.endTime;
  var totalTime = req.query.totalTime;

  var data = fs.readFileSync('data.txt');
  var array = data.toString().split('\n');

  array[0] =  array[0].replace('null', endTime);
  array[0] =  array[0].replace('null', totalTime);
  array[0] =  array[0].replace('start', 'end');
  var str="";
  for( i of array){
   str += i + "\n";
  };
  str = str.trim();
  fs.writeFileSync('data.txt',str);
  res.redirect('/'); 
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');


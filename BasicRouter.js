var express = require('express');
var app = express();
const path = require('path');
const router = express.Router();
var fs = require('fs');

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });
  
  router.get('/data',function(req,res){
  
    var data = fs.readFileSync('data.txt');
    var array = data.toString().split('\n');
    res.send(array);
  });

  //add the router
  app.use('/', router);
  app.listen(process.env.port || 3000);
  
  console.log('Running at Port 3000');


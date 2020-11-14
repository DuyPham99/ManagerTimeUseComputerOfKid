var express = require('express');
var app = express();
const path = require('path');
const router = express.Router();
var fs = require('fs');

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
  var date = new Date("dd/MM/yyyy");
  var str = date.getDay().toString();
  res.send("sdfsafdf");
});

// create helper middleware so we can reuse server-sent events
const useServerSentEventsMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  // only if you want anyone to access this endpoint
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.flushHeaders();

  const sendEventStreamData = (data) => {
      const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
      res.write(sseFormattedResponse);
  }

  // we are attaching sendEventStreamData to res, so we can use it later
  Object.assign(res, {
      sendEventStreamData
  });

  next();
}

const startTime = (req, res) => {
      res.write("hello");
}

app.get('/start', useServerSentEventsMiddleware, 
startTime)

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');


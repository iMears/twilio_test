var express = require('express');
var app     = express();
var http    = require('http');
var twilio  = require('twilio');
var path    = require('path');

app.post('/song', function (req, res) {
  var twiml = new twilio.TwimlResponse();

  twiml.say("Please hold.").play('/public/mj_song.mp3');

  console.log(twiml.toString());

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.post('/:phoneNumber?', function (req, res) {
  console.log("req.headers", req.headers);
  if (req.params.phoneNumber) {
    console.log("req.params.phoneNumber", req.params.phoneNumber);
  }

  var twiml = new twilio.TwimlResponse();

  twiml.say('Welcome to Crux Systems and Twilio. Here is your new delivery order', {
        voice:'woman',
        language:'ko-KR'
      });

  console.log(twiml.toString());

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});


http.createServer(app).listen(1337, function () {
    console.log("Express server listening on port 1337...");
});

app.use("/public", express.static(__dirname + '/public'));

app.use(function(req, res) {
  console.log("request", req.method, req.url)
  res.send("Not found!" + req.method + " " + req.url);
})
require('dotenv').load();

var express    = require('express');
var app        = express();
var http       = require('http');
var twilio     = require('twilio');
var path       = require('path');
var bodyParser = require('body-parser')

//require the Twilio module and create a REST client
var client     = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// enable cross-origin resource sharing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/text-message', function (req, res) {
  if (req.body.sendToNumber && req.body.message) {
    //Send an SMS text message
    client.messages.create({
      to: req.body.sendToNumber, // Any number Twilio can deliver to
      from: '+14103178088', // A number you bought from Twilio and can use for outbound communication
      body: req.body.message // body of the SMS message
    },

    function(err, responseData) { //this function is executed when a response is received from Twilio
      if (!err) { // "err" is an error received during the request, if any
        // "responseData" is a JavaScript object containing data received from Twilio.
        console.log("responseData", responseData);
      } else if (err) {
        console.error("Error", err)
      }

    });

    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end("Success! Message was sent.");
  } else {
    res.writeHead(500, {'Content-Type': 'text/json'});
    res.end("Error! Message was not sent.");
  }

});

app.post('/phone-message', function (req, res) {
  if (req.body.sendToNumber && req.body.message) {
    //Place a phone call, and respond with TwiML instructions from the given URL
    client.makeCall({
      to:req.body.sendToNumber, // Any number Twilio can call
      from: '+14103178088', // A number you bought from Twilio and can use for outbound communication
      url: 'http://5971dd36.ngrok.io/response/' + encodeURIComponent(req.body.message) // A URL that produces an XML document (TwiML) which contains instructions for the call
    },

    function(err, responseData) {
      if (!err) {
        console.log("responseData.from: ", responseData.from);
      } else {
        console.log("Error!", err);
      }
    });
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end("Success! Phone message was sent.");
  } else {
    res.writeHead(500, {'Content-Type': 'text/json'});
    res.end("Error! Phone message was not sent.");
  }

});

app.post('/response/:message?', function (req, res) {

  var twiml = new twilio.TwimlResponse();
  var message = req.params.message || "Hello, this is a test app! Goodbye.";

  twiml.say(message, {
    voice:'woman',
    language:'en-US'
  });

  console.log(twiml.toString());

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.post('/response/song', function (req, res) {
  var twiml = new twilio.TwimlResponse();

  twiml.say("Please hold.").play('/public/mj_song.mp3');

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
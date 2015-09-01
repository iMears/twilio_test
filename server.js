var http   = require('http');
var twilio = require('twilio');

http.createServer(function (req, res) {
  //Create TwiML response
  var twiml = new twilio.TwimlResponse();

  twiml.say('Welcome to Crux Systems. Please hold.', {
        voice:'woman',
        language:'en-gb'
      });
      .play('http://f7178e8e.ngrok.io/mj_song.mp3');

  console.log(twiml.toString());

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

}).listen(1337);

console.log('TwiML servin\' server running at http://127.0.0.1:1337/');
require('dotenv').load();

//require the Twilio module and create a REST client
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

//Send an SMS text message
client.messages.create({

  to:'+17757426305', // Any number Twilio can deliver to
  from: '+14103178088', // A number you bought from Twilio and can use for outbound communication
  body: 'word to your mother.' // body of the SMS message

},
function(err, responseData) { //this function is executed when a response is received from Twilio
  if (!err) { // "err" is an error received during the request, if any
      // "responseData" is a JavaScript object containing data received from Twilio.
      console.log("responseData", responseData);
    }
});

// //Place a phone call, and respond with TwiML instructions from the given URL
// client.makeCall({

//     to:'+17757426305', // Any number Twilio can call
//     from: '+14103178088', // A number you bought from Twilio and can use for outbound communication
//     url: 'http://www.example.com/twiml.php' // A URL that produces an XML document (TwiML) which contains instructions for the call

// }, function(err, responseData) {

//     //executed when the call has been initiated.
//     console.log(responseData.from); // outputs "+14506667788"

// });

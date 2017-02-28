var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.post('/sms', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  var input = req.body;
  console.log(input.From);
  console.log(input.Body);
  // twiml.message('sample reply');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.listen(1337, function () {
  console.log("Express server listening on port 1337");
});

exports.handler = function(event, context){
  var twilio = require('twilio');
  var client = new twilio.RestClient(process.env.SID,process.env.TOKEN);
  var moment = require('moment-timezone');
  var subs = require('./subscribers.json');
  var hour = parseInt(moment.tz("America/Chicago").format('H'));
  var text = "";

  if(hour > 7 && hour <=12)
  {
      text = 'Breakfast';
  }
  else if(hour >= 13 && hour <= 19)
  {
      text = 'Lunch';
  }
  else {
      text = 'Dinner';
  }
var recp = subs[text];
console.log(text);
console.log(hour);
console.log(recp);
text = text + " is served, Feel free to join us. (Do Not Reply)";
for ( i = 0; i < recp.length ; i++){
  sendText(recp[i]);
}

function sendText(inp , cb)
{
  client.sendSms({
    to: inp,
    from: process.env.NUM,
    body: text
  },function(err,res){
    if(!err){
      context.succeed('sent');
    } else {
      context.fail('failed!');
    }
  });
};

}

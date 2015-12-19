var Twit = require('twit');
var Config = require('./config.js');

var express = require("express");
var app = express();
app.get('/', function(req, res){ res.send('Bot is up and running!'); });
app.listen(process.env.PORT || 3000);


var T = new Twit({
	consumer_key: Config.consumer_key,
    consumer_secret: Config.consumer_secret,
    access_token: Config.access_token,
    access_token_secret: Config.access_token_secret
});

var q1 = "Natural Language Processing OR NLP";
var q2 = "Speech Recognition";
var q3 = "Deep Learning";

var counter = 0;
function retweetRecent(param) {
	T.get('search/tweets', {q: param, result_type: "recent"},
		function (err, data, response) {
			if(!err) {
				var retweetID = data.statuses[0].id_str;
				T.post('statuses/retweet/' + retweetID, {}, function (err, response){
					if (response){ console.log('Retweeted Tweet ID: ' + retweetID);}
					if (err) {
						console.log("retweet Error: ", err);
						counter++;
						if(counter == 2) {
							retweetRecent(q3);
							counter = 0;
						}
						
					}
				});
			} else {
				console.log("Search Error: ", err);
			}
		})
}
	
	retweetRecent(q1);
	setInterval(function() {retweetRecent(q1);}, 400000);
	setInterval(function() {retweetRecent(q2);}, 1800000);
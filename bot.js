var Twit = require('twit');

var express = require("express");
var app = express();
app.get('/', function(req, res){ res.send('The robot is happily running.'); });
app.listen(process.env.PORT || 3000);


var T = new Twit({
	consumer_key: 'zRYzXSnoO2qmNStvB0vSzk5q2',
	consumer_secret: '4qES2oOjJgVPbQY4gpvez9ZXoXkRpwnVEG8A6SDXTZnLnMJORY',
	access_token: '4333795461-WmVdr4o0oJMCZfBqi3Nn1wA4YsS2ukH6gwW3TOZ',
	access_token_secret: 'wno3dBzkkIHgV3qJKtlkl9cNqiOQUNF4NqjOEMGWHGhFo'
});

var q1 = "Natural Language Processing OR NLP";
var q2 = "Speech Recognition";
var q3 = "Deep Learning";

function retweetRecent(param) {
	var counter = 0;
	T.get('search/tweets', {q: param, result_type: "recent"},
		function (err, data, response) {
			if(!err) {
				var retweetID = data.statuses[0].id_str;
				T.post('statuses/retweet/' + retweetID, {}, function (err, response){
					if (response){ console.log('Retweeted Tweet ID: ' + retweetID);}
					if (err) {
						console.log("retweet Error: ", err);
						while(counter <3){
							counter++;
							retweetRecent(q3);
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
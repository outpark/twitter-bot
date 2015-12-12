var Twit = require('twit');

var express = require("express");
var app = express();
app.get('/', function(req, res){ res.send('The robot is happily running.'); });
app.listen(process.env.PORT || 6000);


var T = new Twit({
	consumer_key: 'zRYzXSnoO2qmNStvB0vSzk5q2',
	consumer_secret: '4qES2oOjJgVPbQY4gpvez9ZXoXkRpwnVEG8A6SDXTZnLnMJORY',
	access_token: '4333795461-WmVdr4o0oJMCZfBqi3Nn1wA4YsS2ukH6gwW3TOZ',
	access_token_secret: 'wno3dBzkkIHgV3qJKtlkl9cNqiOQUNF4NqjOEMGWHGhFo'
});


function retweetRecent() {
	T.get('search/tweets', {q: "NLP OR Natural Language Processing", result_type: "recent"},
		function (err, data, response) {
			if(!err) {
				var retweetID = data.statuses[0].id_str;
				T.post('statuses/retweet/' + retweetID, {}, function (err, response){
					if (response){ console.log('Retweeted Tweet ID: ' + retweetID);}
					if (err) {
						console.log("retweet Error: ", err);
					}
				});
			} else {
				console.log("Search Error: ", err);
			}
		})
}
	
	retweetRecent();
	setInterval(retweetRecent, 1000000);
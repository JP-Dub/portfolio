module.exports = {
	'yelpAuth' : {
		'client': process.env.YELP_CLIENT,
		'clientKey' : process.env.API_KEY
	},
	'twitter' : {
		'consumerKey' : process.env.TWITTER_KEY,
		'consumerSecret': process.env.TWITTER_SECRET,
		'callbackURL': process.env.TWITTER_URL
	}
};
// Out super-tiny and clean Api class, that frankly doesn't do much
// here's the config for it:
var url = 'http://baguiocity.biz/api/'; // the testing JSON API url (HUGE SHOUTOUT TO RANDOMUSER.ME GUYS!!!)
var limit = 10; // the number of entries per page returned by the JSON API

// the function getData() makes the actual network call and returns JSON object to the caller, Data module
function getData(page, callback_response, callback_error) {
	// first, construct the uri to be called
	var uri = url + '?page=' + page + '&limit=' + limit;
	// now execute the request
	fetch(uri)
	.then(function(response) {
		// when the response comes in, return the json from it
		return response.json();
	}).then(
		// and then fire whatever was passed in as the success case callback
		callback_response
	).catch(
		// or if the request failed, fire whatever was passed in as the error case callback
		callback_error
	);
	console.log(uri);
};

// yeah, and don't forget to make the getData() function available from outside, so that our Data module can actually call it
module.exports = {
	'getData': getData
};

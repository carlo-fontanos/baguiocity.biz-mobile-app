// This here is our fancy Data module, keeping tabs on our data model
var Observable = require('FuseJS/Observable');
// We also require another module of our own, Api, that takes care of the network requests and returns usable data
var Api = require('Modules/ListingsPageApi');

// The variables we need to take care about the data model and its functionality
var data = Observable(); // this here holds a list of our entries
var page = 1; // this here knows which page we have loaded (and need to load next)
var loading = Observable(false); // and this one knows if we're currently loading some data or not

// The init() function is called from ListPage.js upon opening the page
function init() {
	// Since we need to know when the data has been fully loaded and ready for display, we use a Promise implementation
	var promise = new Promise(function(resolve,reject) {
		// First of all, since this is init(), we make sure to reset everything
		reset();
		// then we call the getEntries() function that itself is another promise
		getEntries().then(function() {
			// and when the other getEntries promise resolves, we resolve the current init() promise and notify our ListPage we're done.
			resolve('init done');
		}).catch(function() {
			// and, well, if the getEntries promise rejects, we also notify our ListPage with a reject, so that it can display an error.
			reject('init failed');
		});
	});
	return promise;
};

// The reset() function is only called from the init() function up there
function reset() {
	page = 1; // resets the page to 1 (because our example JSON API starts at 1, not 0)
	data.clear(); // clears the data Observable list, so that nothing is there
};

// The getEntries() function is called from two places - the init() function above,
// and directly from ListPage when we need to "get more entries", or basically the next page of entries.
function getEntries() {
	// Since we need to know when the data has been fully loaded and ready for display, we use a Promise implementation
	var promise = new Promise(function(resolve,reject) {
		// first, we set that we're currently loading data
		loading.value = true;
		// and then we tell our Api module to actually fetch page X for us
		// note that we also pass 2 callback functions, one for success case and one for error case
		Api.getData(
			page,
			function(response) {
				// this here is where we end up after Api got a successful response
				console.log('Api::getData() got ' + response.results.length + ' results for page ' + page);
				// here we call the populate() function that adds entries from response variable to data Observable
				populate(response.results);
				// remember to increment the page variable value, so that the next call uses the new one
				page += 1;
				// now we set that loading was done
				loading.value = false;
				// and resolve this promise to notify the caller we're successfully done
				resolve('getEntries done');
			},
			function(error) {
				// this here is where we end up after Api got an error
				console.log('Api::getData() got error: ' + JSON.stringify(error.message));
				// in the error case we need to set that we're not loading anything anymore too
				loading.value = false;
				// and reject this promise to notify the caller we're done, but with an error
				reject('getEntries failed');
			}
		);
	});
	return promise;
};

// this is the function that is called from the success case in getEntries() function
function populate(results) {
	// it loops through the results array in response
	for (var i in results) {
		// and adds new entries to data Observable, each entry represented by an Object that we get by "new Entry(...)"
		data.add(new Entry(results[i]));
	}
};

// this is our single entry Object constructor
function Entry(info) {
	// it just loops through whatever data we pass to it
	for (var i in info) {
		// and sets this.* members to their appropriate values passed in
		this[i] = info[i];
	}
};

// oh, and yeah, we need to make the following variables and functions accessible to outside, ListPage specifically
module.exports = {
	'data': data,
	'loading': loading,
	'init': init,
	'getEntries': getEntries
};

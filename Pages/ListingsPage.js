// Require our Data module that basically is our data model with added methods for data manipulation
var Data = require('Modules/ListingsPageData');

// This here is the function that is triggered from UX by the Scrolled trigger.
// Note how we have added it to module.exports so it would be available from there.
function getMoreEntries() {
	// Tell our Data module to get some data, and when it's done...
	Data.getEntries().then(
		// Make sure to tell UX to check if we are not at the bottom of the ScrollView already
		function() {
			// Important! "atEnd" is the ux:Name of the Scrolled trigger!
			atEnd.check();
		}
	).catch(function() {
		// If Data.getEntries() did not succeed, you will likely want to show an error to user.
		// Note that this is the error case for each successive "get more entries" call, not the initial one.
		// Because of that, it would make sense to reuse the "<Panel LayoutRole="Placeholder">" to show the error.
	});
};

// This here is executed immediately when we first open the ListingsPage.
// We tell our Data module to load the initial data, and when it's done...
Data.init().then(
	// Make sure to tell UX to check if we are not at the bottom of the ScrollView already
	function() {
		// Important! "atEnd" is the ux:Name of the Scrolled trigger!
		atEnd.check();
	}
).catch(function(e) {
	// If Data.init() did not succeed, you will likely want to show an error to user.
	// Note that this is the error case for the initial data loading call, not the successive "get more entries" calls.
	// Because of that, it would make sense to make a new full-page error Panel.
});

// We need to make these available to our UX
module.exports = {
	'entries': Data.data,
	'loading': Data.loading,
	'getMoreEntries': getMoreEntries
};

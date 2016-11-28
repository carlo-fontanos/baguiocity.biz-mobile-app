var Observable = require("FuseJS/Observable");

var item = this.Parameter;

var data = item.map(function(x) {
	var result = Observable();
	
	fetch('http://baguiocity.biz/api/single-item.php?id=' + x.item_id)
		.then(function(response) { 
			return response.json(); 
		})
		.then(function(responseObject) {
			result.value = responseObject;
		});
		
	return result;
});

	
/* Make our code acciessuble in XML */
module.exports = {
	data: data
};
var item = this.Parameter;

var ID = item.map(function(x) { return x.ID; });
var title = item.map(function(x) { return x.title; });
var content = item.map(function(x) { return x.content; });
var author = item.map(function(x) { return x.author; });
var date = item.map(function(x) { return x.date; });
var condition = item.map(function(x) { return x.condition; });
var price = item.map(function(x) { return x.price; });
var image = item.map(function(x) { return x.image; });
var gallery = item.map(function(x) { return x.gallery; });

/* Make our code acciessuble in XML */
module.exports = {
	ID: ID,
	title: title,
	content: content,
	author: author,
	date: date,
	condition: condition,
	price: price,
	image: image,
	gallery: gallery,
};
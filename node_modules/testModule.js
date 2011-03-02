/*
 * A simple test module for routing 
 */ 

var TestModule = exports.TestModule = function() { 
	this.bar = 'bar';  
};

TestModule.foo = function(req, res) {
	throw RangeError; 
}

TestModule.fooBar = function(req, res) {
	res.writeHead(200, { 'Content-Type' : 'text/html' }); 
	res.end('<html><body><h1>FooBar</h1></body></html>');
}


/*
 * Our code!
 * Handle POST form	
 */
var querystring = require('querystring');

TestModule.add = function(req, res) {
	if (req.method == 'POST') {

		req.addListener('data', function(chunk) {
			var POST = querystring.parse(chunk);
			console.log(POST.title);
			console.log(POST.description);
			console.log(POST.location);
			console.log(POST.link);
		}).addListener('end', function() {
			res.writeHead(200);
			res.end();
		});

	}
}

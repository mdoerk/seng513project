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

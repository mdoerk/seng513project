var fs = require('fs'), 
	http = require('http'),
	path = require('path'),
	url = require('url'),
	util = require('util'), 
	routes = require('./routes'); 

var port = 8124; 

// Process command line arguments 
// ARGV[0] always equals node
// ARGV[1] always equals server.js
var argv = process.ARGV.slice(2);
for (var i = 0; i < argv.length; i++)
{
	switch (argv[i]) {
		case '--port':
			port = parseInt(argv[i + 1], 10); 
			break; 
		default: 
			break; 
	}
}
 
var server = http.createServer(function(req, res) { 
	util.log('Received ' + req.method + ' request for ' + req.url); 
	var parsedUrl = url.parse(req.url, true);
	routes.router.handle(parsedUrl.pathname, req, res); 
}).listen(port); 
util.log('Server running at http://127.0.0.1:' + port);

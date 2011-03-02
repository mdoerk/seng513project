var fs = require('fs'), 
	http = require('http'),
	url = require('url'),
	util = require('util'), 
	router = require('./lib/routes').router; 

var port = 8124; 

// Process command line arguments 
var argv = process.argv.slice(2);
for (var i = 0; i < argv.length; i++) {
	switch (argv[i]) {
		case '--port':
			port = parseInt(argv[i + 1], 10); 
			break; 
		default: 
			break; 
	}
}
 
var server = function(req, res) {
	util.log('Received ' + req.method + ' request for ' + req.url); 
	var parsedUrl = url.parse(req.url, true);
	router.handle(parsedUrl.pathname, req, res); 
}

http.createServer(server).listen(port); 
util.log('Server running on port ' + port);

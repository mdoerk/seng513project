var fs = require('fs'), 
	http = require('http'),
	url = require('url'),
	util = require('util'), 
	router = require('./lib/routes').router,
	templating = require('templatingModule'); 

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
	req.getUser = require('user').getUser;
	res.render = templating.render;
	res.redirectTo = templating.redirectTo;
	res.request = req;
	
	util.log('Received ' + req.method + ' request for ' + req.url); 
	var parsedUrl = url.parse(req.url, true);
	router.handle(parsedUrl.pathname, req, res); 
}

exports.httpServer = http.createServer(server); 
exports.httpServer.listen(port); 

util.log('Server running on port ' + port);

exports.start = function() { 
	if (exports.httpServer.fd == null) { 
		exports.httpServer.listen(port); 
		util.log('Server running on port ' + port);
	} 
}
 
exports.stop = function() { 
	exports.httpServer.close(); 
	util.log('Server stopped'); 
}

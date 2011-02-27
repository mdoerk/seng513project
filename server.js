var fs = require('fs'), 
	http = require('http'),
	url = require('url'),
	util = require('util'), 
	router = require('./lib/routes').router,
	querystring = require('querystring'); 

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

// Parses the giving url string and sets the params to the corresponding values.
var parseGETParameters = function(url){
	questionMarkIndex = url.indexOf('?');
	if(questionMarkIndex == -1)
		return;
	parseParameters(url.slice(questionMarkIndex + 1));
}
// Parses the given string and set he params to the corresponding values.
// Takes a string of the form 'username=user&password=five'
// Sets the params array accordingly. For the above example params.username == user && params.password == five
// Returns nothing.
var parseParameters = function(string){
	this['params'] = queryString.parse(string);
}
 
var server = function(req, res) {
	util.log('Received ' + req.method + ' request for ' + req.url); 
	var parsedUrl = url.parse(req.url, true);
	router.handle(parsedUrl.pathname, req, res); 
}

http.createServer(server).listen(port); 
util.log('Server running on port ' + port);

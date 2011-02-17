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

//load database
//var db = require('./db/database');

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
	keyValuePairs = string.split('&');
	this['params'] = new Array();
	for(index in keyValuePairs){
	 	splitKeyValue = keyValuePairs[index].split('=');
		key = splitKeyValue[0];
		value = splitKeyValue[1];
		this['params'][key] = value;
	}
}
 
var server = http.createServer(function(req, res) { 
	util.log('Received ' + req.method + ' request for ' + req.url); 
	var parsedUrl = url.parse(req.url, true);
	routes.router.handle(parsedUrl.pathname, req, res); 
}).listen(port); 
util.log('Server running on port ' + port);

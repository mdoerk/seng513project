var fs = require('fs'), 
	http = require('http'),
	url = require('url'),
	util = require('util'), 
	router = require('./lib/routes').router,
	templating = require('templatingModule'),
	path = require('path');
	//ls = require('settings');

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

var loadSettings = function(settingsFile, callback) {
	// Try to load the settings from the file
	path.exists(settingsFile, function (exists) {
		if (exists) {
			eval(fs.readFileSync('config.js', encoding="ascii"));
			util.log('Loaded application settings from ' + settingsFile);
		}
		else {
			util.log(settingsFile + ' not found. Using default settings.');
		}
		
		// Define defaults here.
		if (!settings.db_file)
			settings.db_file = 'db/CivicConnect.db';
		if (!settings.email_account)
			settings.email_account = 'civicconnect@gmail.com';
		if (!settings.email_password)
			settings.email_password = '';
		
		if (callback instanceof Function) callback();
	});
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

loadSettings('config.js', function() {
	http.createServer(server).listen(port); 
	util.log('Server running on port ' + port);
});

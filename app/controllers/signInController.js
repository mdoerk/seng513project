var util = require('util'),
fs = require('fs'),
queryString = require('querystring');

var user = require('../models/user');
var index = 'app/views/signIn/signIn.html'

function render(view, res){
	util.pump(fs.createReadStream(view), res, function(err){
		if(err)
			throw err;
	});
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
 	return queryString.parse(string);
}

exports.index = function(req, res){
	if(req.method != 'POST'){
		render(index, res);
		return;
	}
		
	req.content = '';
	
	req.on('data', function(chunk){
		req.content += chunk;
	})
	
	req.on('end', function(){
		req.params = parseParameters(req.content);
		
		var params = req.params
	
		util.debug(util.inspect(params));
	
		user.authenticate(params.username, params.password, function (error, authenticated){
			
			if(error)
				throw error;
			
			if(authenticated){
				redirectTo('/'); // redirect to index.
			}else{
				error = 'Sign in failed.';
				body = 'signIn';
			}
		
		})
	})
}


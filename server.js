var http = require('http');
var fs = require('fs');

var fileLoader = function(dir){
	fs.readdir(dir, function(err, files){
		for(file in files){
			filename = files[file].split('.');
			if(filename[1] == 'js'){
				this[filename[0]] = require('./' + dir + filename[0]);
			}else{
				return;
			}
		}
	});
}

//load Controllers
fileLoader('app/controllers/');
fileLoader('app/models/');

//load database
var db = require('./db/database');

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

var server = function(request, response){
	applicationController.request = request;
	applicationController.response = response;
	
	if(request.method == 'GET')
		parseGETParameters(request.url);
	
	request.content = '';
	request.on('data', function(chunk){
		request.content += chunk;
	})
	request.on('end', function(chunk){
		if(request.method == 'POST')
			parseParameters(request.content);
			
			
		
		//routing needed. for not just assume index of signInController.
		signInController.index();
		console.log(params);
	})
	
}

http.createServer(server).listen(1234);
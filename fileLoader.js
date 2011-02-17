var fs = require('fs');

fileLoader = exports.fileLoader = function(dir, callback){
	console.log('fileLoader: ' + dir);
	fs.readdir(dir, function(err, files){
		fileArray = [];
		for(file in files){
			filename = files[file].split('.');
			if(filename[1] == 'js'){
				this[filename[0]] = require('./' + dir + filename[0]);
			}else{
				return;
			}
		}
		if(callback)
			callback(fileArray);
	});
}

//load Controllers
//fileLoader('app/controllers/');
//load Models
//fileLoader('app/models/');
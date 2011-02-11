var sqlite = require('modules/node-sqlite/sqlite');

this.prototype = database;

//Should this be blocking? I'm not sure a dataase call shoudl be blocking but I'm not sure how to go about this.
//Should every method have a callback? maybe.
var authenticate = function(username, password, callback){
	db.query('SELECT * FROM users WHERE username = ' + username, function(records){
		//TODO: check to make sure we didn't return more then one record.
		//		or maybe this is assumed?
		passwordMatchs = records[0].password_hash == hash(password);
		
		callback(passwordMatches);
		
		return passwordMatches;
	})
	
}
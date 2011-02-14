
var crypto = require('crypto');

// Maybe this should use a salt to secure the password in the database.
var sha1hash = function(string){
	hash = crypto.createHash('sha1');
	hash.update(string + 'randomness');
	return hash.digest('hex');
}


//Should this be blocking? I'm not sure a dataase call shoudl be blocking but I'm not sure how to go about this.
//Should every method have a callback? maybe.
exports.authenticate = function(username, password, callback){
	db.query('SELECT * FROM users WHERE username = \'' + username + '\'', function(records){
		//TODO: check to make sure we didn't return more then one record.
		//		or maybe this is assumed?
		
		if(records.length == 0)
			return false;
		
		passwordMatches = records[0].password_hash == sha1hash(password);
		
		callback(passwordMatches);
		
		return passwordMatches;
	})
	
}
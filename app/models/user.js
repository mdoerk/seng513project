var crypto = require('crypto'),
dbAccess = require('../../node_modules/dbAccess');

// Maybe this should use a salt to secure the password in the database.
var sha1hash = function(string){
	hash = crypto.createHash('sha1');
	hash.update(string + 'randomness');
	return hash.digest('hex');
}
/*
 * Checks if email and password match.
 * 
 * 'email': The email address of the user.
 * 'password': The password to check.
 * 'callback': returns (error, isAuthenticated), where error is null unless
 *    an error occured and isAuthenticated is boolean.
 */
exports.authenticate = function(email, password, callback){
	dbAccess.find('users', { values:['email="' + email + '"']}, function(error, records){
		if(error)
			callback(error, null);
		
		if(records.length == 0)
			callback("Email not found in database.", null);
		
		isAuthenticated = records[0].password == sha1hash(password);
		
		callback(null, isAuthenticated);
	});	
}

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
 * 'callback': returns (error, user), where error is null unless
 *    an error occured and user is null if the password hashes don't
 *    match or the user record otherwise.
 */
exports.authenticate = function(email, password, callback){
	dbAccess.find('users', { values:['email="' + email + '"']}, function(error, records){
		if(error)
			return callback(error, null);
		
		if(records.length == 0)
			return callback("Email not found in database.", null);
		
		user = records[0];
		if(user && user.password != sha1hash(password));
			user = null;
		
		callback(null, user);
	});	
}

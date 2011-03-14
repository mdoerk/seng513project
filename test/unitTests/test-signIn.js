var testCase = require('nodeunit/nodeunit').testCase;
	users = require('user');
	dbAccess = require('dbAccess');

module.exports = testCase({
	setUp: function (callback) {
		
		// whan to load db/fixtures/users.sql
		dbAccess.create('users', { values: 
			['"name"="John"',
			'"email"="user"', 
			'"password"="b8a9f715dbb64fd5c56e7783c6820a61"']}, callback);
	},
	tearDown: function (callback) {
		dbAccess.remove('users', { conditions: ['email = "user"']}, callback);
	},
	testSignInEmailAndPasswordCorrect: function (test) {
		users.authenticate('John','two', function(error, user){
			test.equal(error, null);
			test.ok(user);
			test.done();
		});
	},
	testSignInPasswordIncorrect: function (test) {
		users.authenticate('John', 'four', function(error, user){
			test.equal(error, null);
			test.equal(user, null);
			test.done();
		});
	},
	testSignInUserIncorrect: function (test) {
		users.authenticate('notJohn', 'two', function(error, user){
			test.equal(error, null);
			test.equal(user, null);
			test.done();
		});
	}
});

/* test-signIn.js 
 * Tests the authentication functionality for sign-in 
 */ 

var testCase = require('nodeunit/nodeunit').testCase,
	signIn = require('../../node_modules/user'),
	dbAccess = require('../../node_modules/dbAccess');

module.exports = testCase({
	setUp: function (callback) {
		dbAccess.create('users', { values: ['name="TestUser"', 'email="testuser@test.com"', 
			'password="5f4dcc3b5aa765d61d8327deb882cf99"']}, function(error, results) {
				callback();
			});
	},
	
	tearDown: function (callback) {
		dbAccess.remove('users', { conditions: ['name="TestUser"', 'email="testuser@test.com"']}, function(error, results) {
			callback();
		});
	},
	
	testSignInNameAndPasswordCorrect: function (test) {
		signIn.authenticate('testuser@test.com','password', function(error, user) {
			test.equal(error, null);
			test.ok(user);
			test.done();
		});
	},
	
	testSignInPasswordIncorrect: function (test) {
		signIn.authenticate('testuser@test.com', 'wrongpassword', function(error, user) {
			test.equal(error, null);
			test.equal(user, null);
			test.done();
		});
	},
	
	testSignInUserDoesNotExist: function (test) {
		signIn.authenticate('wrongEmail', 'password', function(error, user){
			test.equal(error, null);
			test.equal(user, null);
			test.done();
		});
	}
});

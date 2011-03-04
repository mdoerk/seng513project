var testCase = require('nodeunit/nodeunit').testCase;
	signIn = require('../../node_modules/user');
	dbAccess = require('../../node_modules/dbAccess');

module.exports = testCase({
	setUp: function (callback) {
		
		// whan to load db/fixtures/users.sql
		dbAccess.create('users', { values: 
			['"name"="John"',
			'"email"="user"', 
			'"password"="b8572e307fcb2694778271edc56638cf7ee68969"']}, callback);
		callback();
	},
	tearDown: function (callback) {
		dbAccess.remove('users', { conditions: ['email = "user"']}, callback);
		callback();
	},
	testSignInEmailAndPasswordCorrect: function (test) {
		signIn.authenticate('user','two', function(error, user){
			test.equal(error, null);
			test.ok(user);
			test.done();
		});
	},
	testSignInPasswordIncorrect: function (test) {
		signIn.authenticate('user', 'four', function(error, user){
			test.equal(error, null);
			test.equal(user, null);
			test.done();
		});
	},
	testSignInUserIncorrect: function (test) {
		signIn.authenticate('nonUser', 'two', function(error, user){
			test.equal(error, null);
			test.equal(user, null);
			test.done();
		});
	}
});
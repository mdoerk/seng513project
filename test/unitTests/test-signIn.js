var testCase = require('nodeunit/nodeunit').testCase;
	signIn = require('../../node_modules/user');
	dbAccess = require('../../node_modules/dbAccess');

module.exports = testCase({
	setUp: function (callback) {
		dbAccess.create('users', { values: ['email = "user"', 'password = "five"']}, callback);
		callback();
	},
	tearDown: function (callback) {
		dbAccess.remove('users', { conditions: ['email = "user"']}, callback);
		callback();
	},
	testSignInEmailAndPasswordCorrect: function (test) {
		signIn.authenticate('user','five', function(error, user){
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
		signIn.authenticate('user', 'four', function(error, user){
			test.equal(error, null);
			test.equal(user, null);
			test.done();
		});
	}
});
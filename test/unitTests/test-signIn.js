var testCase = require('nodeunit/nodeunit').testCase;
	signIn = require('../app/models/user');
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
	exports['Email & Password Correct'] = function (test) {
		test.equal(signIn.authenticate('user','five'), (null, true));
		test.done();
	},
	exports['Password Incorrect'] = function (test) {
		test.equal(signIn.authenticate('user', 'four'), (null, false));
		test.done();
	},
	exports['User Incorrect'] = function (test) {
		test.equal(signIn.authenticate('users', 'five'), ("Email not found in database.", null));
		test.done();
	}
});
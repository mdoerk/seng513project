/* test-emailUtil.js 
 *
 * Tests for email utilities (emailUtil.js)
 *
 * March 27, 2011
 */

var testCase = require('nodeunit/nodeunit').testCase,
	emailUtil = require('../../node_modules/emailUtil');
	//dbAccess = require('../../node_modules/dbAccess'),
	//util = require('util');

module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	
	tearDown: function (callback) {
		callback();
	},
	
	testSendEmailUserId: function (test) {
		emailUtil.sendEmailUserId(1, 'hi', 'yo bro', function(error, result) {
			test.ifError(error);
			test.done();
		});
	}
});

/* test-emailUtil.js 
 *
 * Tests for email utilities (emailUtil.js)
 *
 * March 27, 2011
 */

var testCase = require('nodeunit/nodeunit').testCase,
	emailUtil = require('../../node_modules/emailUtil'),
	util = require('util');

module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	
	tearDown: function (callback) {
		callback();
	},
	
	testsendPlainTextEmailToUserId: function (test) {
		// Send an email to the System account (userid = 1)
		emailUtil.sendPlainTextEmailToUserId(1, 'Plain Text Email, sent by userId', 'Here is some plain text.\nAnother line of plain text.', function(error, success) {
			test.ifError(error);
			test.equal(success, true);
			test.done();
		});
	},
	
	testsendHTMLEmailToUserId: function (test) {
		// Send an email to the System account (userid = 1)
		emailUtil.sendHTMLEmailToUserId(1, 'HTML Email, sent by userId', '<html>Formatted html email. <b>This should be bold.</b></html>', function(error, success) {
			test.ifError(error);
			test.equal(success, true);
			test.done();
		});
	},
	
	testsendPlainTextEmailToAddress: function (test) {
		// Send an email to the civicconnect@gmail.com
		emailUtil.sendPlainTextEmailToAddress('civicconnect@gmail.com', 'Plain Text Email, sent by address', 'Here is some plain text.\nAnother line of plain text.', function(error, success) {
			test.ifError(error);
			test.equal(success, true);
			test.done();
		});
	},
	
	testsendHTMLEmailToAddress: function (test) {
		// Send an email to the civicconnect@gmail.com
		emailUtil.sendHTMLEmailToAddress('civicconnect@gmail.com', 'HTML Email, sent by address', '<html>Formatted html email. <b>This should be bold.</b></html>', function(error, success) {
			test.ifError(error);
			test.equal(success, true);
			test.done();
		});
	}
});

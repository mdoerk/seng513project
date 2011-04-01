/* test-messages.js 
 *
 * Testing of the messages back-end functions
 * Dori Saba
 * sabad66@hotmail.com
 * March 17, 2011
 */

var testCase = require('nodeunit/nodeunit').testCase,
	messages = require('../../node_modules/message'),
	//dbAccess = require('../../node_modules/dbAccess'),
	util = require('util');

module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	
	tearDown: function (callback) {
		callback();
	},
	
	testSendMessage: function(test) {
		// Send a message from user 1 to user 2
		messages.sendMessage(1, 2, 's', 'b', function(error) {
			test.ifError(error);
			// Now make sure that it is in user 2's inbox
			messages.getMessages(2, 0, function(error, msgList) {
				test.ifError(error);
				util.log(msgList.length);
				util.log(msgList[0].id);
				test.done();
			});
		});
	},
	
	testGetMessages: function(test) {
		test.done();
	}
	
});


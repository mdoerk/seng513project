/* tags.js 
 *
 * Provides functions for tagging issues
 * Dori Saba
 * sabad66@hotmail.com
 * March 3, 2011
 */

var testCase = require('nodeunit/nodeunit').testCase,
	tags = require('../../node_modules/tags'),
	dbAccess = require('../../node_modules/dbAccess');

module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	tearDown: function (callback) {
		callback();
	},
	testGetTagId: function(test) {
		// First add a new unique tag
		var d = new Date();
		var t1 = d.getTime();
		tags.addTag(t1, function(error, t1Id) {
			test.notEqual(t1Id, -1); // id will be -1 if there was an error
			// Now look up the tag, and compare it with the id
			tags.getTagId(t1, function(error, t1LookUpId) {
				test.equal(t1LookUpId, t1Id);
				// Now look up one that doesn't exist, make sure it returns -1
				tags.getTagId(t1 + 'x', function(error, t2Id) {
					test.equal(t2Id, -1);
					test.done();
				});
			});
		});
	},
	testAddTag: function(test) {
		// Make a uniqe tag
		var d = new Date();
		var t1 = d.getTime();
		tags.addTag(t1, function(error, t1Id) {
			test.notEqual(t1Id, -1); // id will be -1 if there was an error
			// Add another unique tag
			var t2 = t1 + 'x';
			tags.addTag(t2, function(error, t2Id) {
				// Ensure this one isn't -1, and isn't the same as t1's id
				test.notEqual(t2Id, -1);
				test.notEqual(t2Id, t1Id);
				// Try to add t1 again
				tags.addTag(t1, function (error, t3Id) {
					// Ensure it isn't -1, but that it does match t1's id
					test.notEqual(t3Id, -1);
					test.equal(t3Id, t1Id);
					test.done();
				});
			});
		});
	},
	testTagIssue: function(test) {
		//var t = 'roads';
		//tags.tagIssue(1, t, function () {});
		
		test.done();
	}
	// More tests can follow. but don't forget the ','
});

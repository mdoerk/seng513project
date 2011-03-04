/* tags.js 
 *
 * Provides functions for tagging issues
 * Dori Saba
 * sabad66@hotmail.com
 * March 3, 2011
 */

var testCase = require('nodeunit/nodeunit').testCase,
	tags = require('../../node_modules/tags'),
	//sqlite = require('sqlite');
	dbAccess = require('../../node_modules/dbAccess');

module.exports = testCase({
	setUp: function (callback) {
		// Use this function to setup any thing you might 
      // need to test (ie. connections to a test db).

		callback();
	},
	tearDown: function (callback) {
		// clean up
		callback();
	},
	testParsing: function (test) {
		// Try a simple one first
		var s = 'mytag';
		var listOfTags = tags.parseTags(s);
		// Check that the length, then the contents
		test.equals(listOfTags.length, 1, 
			'List should have length of 1. Actual length is ' + listOfTags.length);
		test.equals(listOfTags[0], 'mytag',
			"First element should be 'mytag'. Actual: " + listOfTags[0]);
		// Another simple one
		s = 'first second';
		listOfTags = tags.parseTags(s);
		test.equals(listOfTags.length, 2,
			'List should have length of 2. Actual length is ' + listOfTags.length);
		test.equals(listOfTags[0], 'first',
			"First element should be 'first'. Actual: " + listOfTags[0]);
		test.equals(listOfTags[1], 'second',
			"Second element should be 'second'. Actual: " + listOfTags[1]);
		// Test with numbers
		test.done();
	},
	testValidIssue: function(test) {
		// Try one that we know isn't in there
		test.equals(tags.validIssue(999), false);
		test.done();
	}
	// More tests can follow. but don't forget the ','
});

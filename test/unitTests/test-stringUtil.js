/* test-stringUtil.js 
 * Tests for basic stringUtil functions 
 */
var wordFilter = require('../../node_modules/stringUtil');
var testCase = require('nodeunit/nodeunit').testCase;

module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	 
	tearDown: function (callback) {
		callback();
	},
	
	testBlankString: function (test) {
		var whitespaceString = '  '; 
		test.ok(whitespaceString.isNullOrEmptyOrBlank()); 
		test.done(); 
	},
	
	testEmptyString: function (test) {
		var emptyString = ''; 
		test.ok(emptyString.isNullOrEmptyOrBlank()); 
		test.done(); 
	}, 
	
	testGoodString: function(test) {
		var goodString = 'notempty';
		test.ok(!goodString.isNullOrEmptyOrBlank());
		test.done();
	},
	
	testAbbreviateString: function (test) {
		var stringToTruncate = 'Lorem ipsum dolor sit amet.'; 
		test.equals(stringToTruncate.abbreviate(5), 'Lorem...'); 
		var stringToTruncate = ''; 
		test.equals(stringToTruncate.abbreviate(5), ''); 
		test.done(); 
	}, 
	
	testTrimEnd: function (test) {
		var stringToTrim = 'foo   '; 
		test.equals(stringToTrim.trimEnd(), 'foo'); 
		stringToTrim = ''; 
		test.equals(stringToTrim.trimEnd(), ''); 
		stringToTrim = '    '; 
		test.equals(stringToTrim.trimEnd(), ''); 
		test.done(); 
	},

	testTrimStart: function (test) {
		var stringToTrim = '   foo'; 
		test.equals(stringToTrim.trimStart(), 'foo'); 
		stringToTrim = ''; 
		test.equals(stringToTrim.trimStart(), ''); 
		stringToTrim = '    '; 
		test.equals(stringToTrim.trimStart(), ''); 
		test.done(); 
	}, 

	testTrim: function (test) {
		var stringToTrim = '   foo    '; 
		test.equals(stringToTrim.trim(), 'foo'); 
		stringToTrim = ''; 
		test.equals(stringToTrim.trim(), ''); 
		stringToTrim = '    '; 
		test.equals(stringToTrim.trim(), ''); 
		test.done(); 
	}
});
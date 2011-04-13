/*
 * Tests for sanitizeInputs.js
 * Created by: Nasrullah Taha
 */
 
var sanitizeInputs = require('sanitizeInputs.js');
var nodeunit = require('nodeunit/nodeunit');

module.exports = nodeunit.testCase({
	setUp: function(callback) {
		callback();
	},
	 
	tearDown: function(callback) {
		callback();
	},

	testSimpleString:function(test) {
		var testString = "hello world!";
		var result = sanitizeInputs.removeTags(testString);
		test.deepEqual(result, testString);
		test.done();
	},
	
	testStringWithOneTag:function(test) {
		var testString = "<a>hello world!";
		var result = sanitizeInputs.removeTags(testString);
		var expected = "hello world!";
		test.deepEqual(result, expected);
		test.done();
	},
	
	testStringWithMultipleTags:function(test) {
		var testString = "hello <script>world!</script>";
		var result = sanitizeInputs.removeTags(testString);
		var expected = "hello world!";
		test.deepEqual(result, expected);
		test.done();
	},
	
	testString_TagsWithSpecialCharacters:function(test) {
		var testString = '<a href="/index.html">hello</a> world!';
		var result = sanitizeInputs.removeTags(testString);
		var expected = "hello world!";
		test.deepEqual(result, expected);
		test.done();
	}
});

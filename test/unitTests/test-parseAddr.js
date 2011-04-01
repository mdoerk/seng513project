/**
 * This is the parseAddr.js test file.
 * By: Tony Cheng @ Mar. 3, 2011
**/

var testCase = require('nodeunit/nodeunit').testCase,
	parseAddr = require('../../node_modules/parseAddr');
	
module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	
	tearDown: function(callback) {
		callback();
	},
	
	testParseValidAddress: function(test) {
		var tolerance = 0.00001;
		var expectedLat = 51.117; 
		var expectedLong = -114.054; 
		parseAddr.geocode("#32 7205 4St. N.E. Calgary, AB, Canada", function(location) { 
			test.notEqual(location.latitude, '');
			test.notEqual(location.longitude, '');
			test.ok(isEqual(location.latitude, expectedLat, tolerance));
			test.ok(isEqual(location.longitude, expectedLong, tolerance));
			test.done();
		});
	},
	
	testparseInvalidAddress: function(test) {
		parseAddr.geocode("i don't know where i am", function(location) { 
			test.equals(location.latitude, '');
			test.equals(location.longitude, '');	
			test.done(); 
		});
	}
});

function isEqual(actual, expected, tolerance) { 
	var lowerBound = actual - Math.abs(actual * tolerance);
	var upperBound = actual + Math.abs(actual * tolerance); 
	return (expected >= lowerBound && expected <= upperBound) ? true : false; 
}

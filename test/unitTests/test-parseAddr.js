/**
 * This is the parseAddr.js test file.
 * By: Tony Cheng @ Mar. 3, 2011
**/

var testCase = require('nodeunit/nodeunit').testCase,
	parseAddr = require('parseAddr');
	
module.exports = testCase({
	setUp: function (callback) {
		// a valid input
		this.validAddr = "#32 7205 4St. N.E. Calgary, AB, Canada";
		// an invalid input
		this.invalidAddr = "i don't know where i am";
		this.actual1;
		this.actual2;		
		//parseAddr.geocode(this.invalidAddr, function(ret) { this.actual2=ret;});
		//this.actual2 = parseAddr(this.invalidAddr);
		callback();
	},
	
	tearDown: function(callback) {
	
		callback();
	}/*,
	parseValidAddr: function(test) {
		// expecting the results not to be empty
		var actual;		
		parseAddr.geocode(this.validAddr, function(ret) { this.actual1=ret; console.log(ret.latitude);});
		//parseAddr.geocode(this.validAddr, function(ret) { 
			//actual=ret;
			
		test.notEqual(this.actual1.latitude, "");
		test.notEqual(this.actual1.longitude, "");
		test.done();
		//});
	}	,
	parseInvalidAddr: function(test) {
		// expecting the results to be empty
		var actual;
		parseAddr.geocode(this.invalidAddr, function(ret) { 
			actual=ret;
		test.throws(this.actual.latitude);
		test.throws(this.actual.longitude);
		test.done();
		});
	}*/
});

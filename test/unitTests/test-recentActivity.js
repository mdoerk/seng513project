var recentActivity =  require('../../node_modules/recentActivity');
var testCase = require('nodeunit/nodeunit').testCase;
var dbAccess = require('dbAccess'); 
module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	 
	tearDown: function (callback) {
		callback();
	},
	
	testCase: function (test) {
		
		recentActivity.getRecentActivityList(27, function(error, results) {
			if (error) { throw error; } 
			console.log('TEST: ' + results.length); 
			for (i in results) {
				console.log(results[i].contents.created); 
			}
			test.done(); 
		});  
	}
});
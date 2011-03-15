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
	
	testGetUserRecentActivityList: function (test) {
		recentActivity.getUserRecentActivityList(27, 20, function(error, results) {
			test.equals(error, null); 
			test.equals(results.length, 20);
			var previousRank = results[0].relevance; 
			for (r in results) {
				test.ok(results[r].relevance <= previousRank); 
				previousRank = results[r].relevance; 
			}
			test.done(); 
		});  
	}, 
	
	testGetRecentActivityList: function (test) {
		recentActivity.getRecentActivityList(10, function(error, results) {
			test.equals(error, null); 
			test.equals(results.length, 10);
			test.done(); 
		});  
	}
});
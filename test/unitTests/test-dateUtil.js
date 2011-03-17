/* test-dateUtil.js 
 * Tests functionality in dateUtil 
 */ 
 
var dateUtil = require('../../node_modules/dateUtil');
var testCase = require('nodeunit/nodeunit').testCase;

module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	 
	tearDown: function (callback) {
		callback();
	},
	
	testDateHowLongAgoStringDateConversion: function (test) {
		var d1 = new Date('March 31, 2011 11:00:00'); 
		test.equals(d1.howLongAgo('March 31, 2011 10:59:30'), 'Just now'); 
		test.done(); 
	},
	
	testDateHowLongAgoFutureDate: function (test) {
		var d1 = new Date('March 31, 2011 11:00:00'); 
		var d2 = new Date('April 15, 2011 10:59:30'); 
		test.equals(d1.howLongAgo(d2), ''); 
		test.done(); 
	},
	
	testDateHowLongAgoJustNow: function (test) {
		var d1 = new Date('March 31, 2011 11:00:00'); 
		var d2 = new Date('March 31, 2011 10:59:30'); 
		test.equals(d1.howLongAgo(d2), 'Just now'); 
		d2 = new Date('March 31, 2011 10:59:01'); 
		test.equals(d1.howLongAgo(d2), 'Just now'); 
		test.done(); 
	},
	
	testDateHowLongAgoOneMinuteAgo: function (test) {
		var d1 = new Date('March 31, 2011 11:00:00'); 
		var d2 = new Date('March 31, 2011 10:58:30'); 
		test.equals(d1.howLongAgo(d2), '1 minute ago'); 
		d2 = new Date('March 31, 2011 10:59:00'); 
		test.equals(d1.howLongAgo(d2), '1 minute ago'); 
		test.done(); 
	},
	
	testDateHowLongAgoMinutesAgo: function (test) {
		var d1 = new Date('March 31, 2011 11:00:00'); 
		var d2 = new Date('March 31, 2011 10:50:00'); 
		test.equals(d1.howLongAgo(d2), '10 minutes ago'); 
		d2 = new Date('March 31, 2011 10:57:59');
		test.equals(d1.howLongAgo(d2), '2 minutes ago');
		d2 = new Date('March 31, 2011 10:00:01');
		test.equals(d1.howLongAgo(d2), '59 minutes ago'); 		
		test.done(); 
	},
	
	testDateHowLongAgoOneHourAgo: function (test) {
		var d1 = new Date('March 31, 2011 11:00:00'); 
		var d2 = new Date('March 31, 2011 09:50:00'); 
		test.equals(d1.howLongAgo(d2), '1 hour ago');
		d2 = new Date('March 31, 2011 10:00:00');
		test.equals(d1.howLongAgo(d2), '1 hour ago'); 
		test.done(); 
	},
	
	testDateHowLongAgoHoursAgo: function (test) {
		var d1 = new Date('March 31, 2011 11:00:00'); 
		var d2 = new Date('March 31, 2011 06:50:00'); 
		test.equals(d1.howLongAgo(d2), '4 hours ago'); 
		test.done(); 
	},
	
	testDateHowLongAgoYesterday: function (test) {
		var d1 = new Date('March 31, 2011 11:00:00'); 
		var d2 = new Date('March 30, 2011 06:50:00'); 
		test.equals(d1.howLongAgo(d2), 'Yesterday'); 
		test.done(); 
	},
	
	testDateHowLongAgoDaysAgo: function (test) {
		var d1 = new Date('March 31, 2011 11:00:00'); 
		var d2 = new Date('March 28, 2011 06:50:00'); 
		test.equals(d1.howLongAgo(d2), '3 days ago'); 
		test.done(); 
	},
	
	testDateHowLongAgoWeeksAgo: function (test) {
		var d1 = new Date('March 31, 2011 11:00:00'); 
		var d2 = new Date('March 5, 2011 06:50:00'); 
		test.equals(d1.howLongAgo(d2), '4 weeks ago'); 
		test.done(); 
	},
	
	testDateHowLongAgoMonthsAgo: function (test) {
		var d1 = new Date('June 30, 2011 11:00:00'); 
		var d2 = new Date('April 30, 2011 06:50:00'); 
		test.equals(d1.howLongAgo(d2), '2 months ago'); 
		d2 = new Date('May 30, 2011 11:00:00'); 
		test.equals(d1.howLongAgo(d2), '1 month ago'); 
		d2 = new Date('May 25, 2011 11:00:00'); 
		test.equals(d1.howLongAgo(d2), '1 month ago'); 
		d2 = new Date('July 5, 2010 11:00:00'); 
		test.equals(d1.howLongAgo(d2), '11 months ago'); 
		test.done(); 
	},
	
	testDateHowLongAgoYearsAgo: function (test) {
		var d1 = new Date('June 30, 2011 11:00:00'); 
		var d2 = new Date('June 20, 2010 11:00:00'); 
		test.equals(d1.howLongAgo(d2), '1 year ago'); 
		var d2 = new Date('July 5, 2007 11:00:00'); 
		test.equals(d1.howLongAgo(d2), '3 years ago');
		test.done(); 
	}
});
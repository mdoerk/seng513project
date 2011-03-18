/* test-cache.js 
 * Tests functionality of cache  
 */ 
 
var Cache = require('../../node_modules/cache').Cache;
var testCase = require('nodeunit/nodeunit').testCase;

module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	 
	tearDown: function (callback) {
		callback();
	},
	
	testAddToCache: function (test) {
		var testCache = new Cache(); 
		testCache.add('foo', 'bar'); 
		test.equals(testCache.count, 1); 
		test.ok(testCache.contains('foo')); 
		test.equals(testCache.get('foo'), 'bar'); 
		testCache.remove('foo');  
		test.equals(testCache.contains('foo'), false); 
		test.done(); 
	},
	
	testRemoveFromCache: function (test) { 
		var testCache = new Cache(); 
		test.equals(testCache.count, 0);
		testCache.remove('foo'); 
		test.equals(testCache.count, 0);
		testCache.add('foo', 'bar');
		test.equals(testCache.count, 1);		
		testCache.remove('foo');  
		test.equals(testCache.count, 0);		
		test.done(); 
	},
	
	testGetFromCache: function (test) { 
		var testCache = new Cache(); 
		test.equals(testCache.count, 0);
		test.equals(testCache.get('foo'), undefined);
		testCache.add('foo', 'bar');
		test.equals(testCache.get('foo'), 'bar');
		test.done(); 
	},
	
	testCacheContains: function (test) { 
		var testCache = new Cache(); 
		test.equals(testCache.contains('foo'), false);
		testCache.add('foo', 'bar');
		test.equals(testCache.contains('foo'), true);
		test.done(); 
	},
	
	testClearCache: function (test) { 
		var testCache = new Cache(); 
		testCache.add('foo', 'bar'); 
		test.equals(testCache.count, 1);
		testCache.clear(); 
		test.equals(testCache.count, 0);
		test.equals(testCache.contains('foo'), false); 
		test.done(); 
	}
});

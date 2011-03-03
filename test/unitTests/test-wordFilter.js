/*
 * This is the offensive words test class.  
 * It performs unit tests on the offensive words functions.
 */
 
var wordFilter = require('../../node_modules/wordFilter');
var testCase = require('nodeunit/nodeunit').testCase;

module.exports = testCase({
	setUp: function (callback) {
		wordFilter.addWord('foobar');
		wordFilter.addWord('loremipsum'); 
		callback();
	},
	 
	tearDown: function (callback) {
		callback();
	},
	
	testIsWordOffensive: function (test) {
		test.ok(wordFilter.isWordOffensive('foobar'), 'Should be offensive word');
		test.ok(wordFilter.isWordOffensive('loremipsum'), 'Should be offensive word');
		test.equals(false, wordFilter.isWordOffensive('foo')); 
		test.equals(false, wordFilter.isWordOffensive('foo-bar')); 
		test.equals(false, wordFilter.isWordOffensive('foo bar')); 
		test.equals(false, wordFilter.isWordOffensive('')); 
		test.done(); 
	},
	
	testCountOffensiveWords: function (test) { 
		var badText = 'This contains 2 offensive words: foobar and loremipsum'; 
		var badText2 = 'foobar foobar loremipsum'; 
		var goodText = 'All good here!';
		var emptyText = ''; 
		
		test.equals(2, wordFilter.countOffensiveWords(badText)); 
		test.equals(3, wordFilter.countOffensiveWords(badText2)); 
		test.equals(0, wordFilter.countOffensiveWords(goodText)); 
		test.equals(0, wordFilter.countOffensiveWords(emptyText)); 
		test.done(); 
	}
});
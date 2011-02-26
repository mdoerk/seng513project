//Include your modules that you will need
var testCase = require('nodeunit/nodeunit').testCase;

module.exports = testCase({
    setUp: function (callback) {
        // Use this function to setup any thing you might 
        // need to test (ie. connections to a test db).

        this.foo = 'bar';
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    yourTestName1: function (test) {
        test.equals(this.foo, 'bar');
        test.done();
    },
    yourTestName2: function (test) {
        test.equals('bar'.length, 3);
        test.done();
    }
    // More tests can follow. but don't forget the ','
});
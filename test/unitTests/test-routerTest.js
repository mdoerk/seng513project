/**
* This is the router test class.  It performs unit tests on the router
* functions.
*
* Created By: Eric Kryski Feb. 25, 2011
**/


var Router = require('../../lib/router').Router;
var testCase = require('nodeunit').testCase;

module.exports = testCase({
    setUp: function (callback) {
	// Setting up the router object 
		this.r = new Router();
	
	// Setting up a local testRoute to compare to	
		this.testRoute = [];
		this.testRoute['/'] = 'index.html'
	
	// Adding a route through the router.Add function	
		this.r.add('/', 'index.html');
		
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    testAddRoutes: function (test) {
	// Compare the our testRoute array to the one used by the server.
        test.equals(this.testRoute['/'], this.r.simpleRoutes['/']);
        test.done();
    }
});
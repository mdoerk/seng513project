/**
* This is the router test class.  It performs unit tests on the router
* functions.
*
* Created By: Eric Kryski Feb. 25, 2011
* Updated by: Winnie Wu	Feb.25, 2011
**/


var Router = require('../../lib/router').Router;
var nodeunit = require('nodeunit/nodeunit');

exports['router'] = nodeunit.testCase({
	setUp:function(callback){
	//setup
		//create router object
		this.r = new Router();
		
		//setup sample functions
		this.TestModule = exports.TestModule = function() { 
			this.bar = 'bar';  
		};
		
		this.TestModule.foo = function(req, res) {
			throw RangeError; 
		}

		this.TestModule.fooBar = function(req, res) {
			res.writeHead(200, { 'Content-Type' : 'text/html' }); 
			res.end('<html><body><h1>FooBar</h1></body></html>');
		}
		callback();
	},
	
	tearDown:function(callback){
	//tear down
		this.r = null;
		this.TestModule = null;
		//clean up
		callback();
	},
	
	testAddSimpleRoutes:function(test){
		test.expect(2); //specify number of assertions are expected to run within test class. useful for ensuring callbacks and assertions are run.
		 
		//add simple routes

		//test add a simple route to an html page file
		this.r.add('/', 'index.html');
		test.equal(this.r.simpleRoutes['/'], 'index.html');
				
		//test add a simple route to a function
		this.r.add('/fooBar', this.TestModule.fooBar);
		test.equal(this.r.simpleRoutes['/fooBar'], this.TestModule.fooBar);
		
			
		test.done();//finish current test function. INCLUDE THIS IN ALL TEST FUNCTIONS
	},

	testAddRegularExpressionRoutes: function(test){
		test.expect(2);		
	
		//add regexRoute
		var route =/123/;
		var path = 'static.html'; 
		
		//test adding a regular expression route to a static page
		this.r.add(route, path);
		test.equal(this.r.regexRoutes['123'], path);
		
		//test adding a regular expression route to a function
		route = /^\/home$/;
		path = this.TestModule.foobar;
		this.r.add(route, path); 
		test.equal(this.r.regexRoutes['/home/'], path);

		test.done();
	}
});


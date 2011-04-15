var testCase = require('nodeunit/nodeunit').testCase, 
	Client = require('functionalTesting/funcTest').Client,  
	server = require('../../server'); 

module.exports = testCase({
	setUp: function (callback) {
		server.start(); 
		callback();
	},
	tearDown: function (callback) {
		server.stop(); 	
		callback();
	},
	testValidSignIn: function (test) {
		var client = new Client(); 
		var postBody = client.stringifyQuery({ 'email': 'civicconnect@gmail.com', 'password': 'password' });
		// Login as user with correct credentials 
		client.sendRequest('POST', '/signin', { body : postBody }, function(signInRes) { 
			test.equals(signInRes.status, 302); 
			test.ok(signInRes.headers['set-cookie'] != undefined); 
			test.equals(signInRes.headers['location'], '/'); 
			// Follow redirect to '/'. Validate login header contains user 
			client.sendRequest('GET', '/', { header : {'cookie': signInRes.headers['set-cookie']} }, function(idxRes) { 
				test.equals(idxRes.status, 200);
				test.ok(idxRes.body != undefined); 
				resBody = idxRes.body; 
				var loginHeaderPatt = /Welcome.*System/gi; 
				var matches = resBody.match(loginHeaderPatt); 				
				test.equals(matches.length, 1); 
				test.done();
			}); 
		});
	},
	testInvalidSignIn: function (test) {
		var client = new Client(); 
		var postBody = client.stringifyQuery({ 'email': 'civicconnect@gmail.com', 'password': 'wrongpassword' });
		// Login as user with incorrect credentials 
		// Validate header still contains links to login and join 
		client.sendRequest('POST', '/signin', { body : postBody }, function(signInRes) { 
			test.equals(signInRes.status, 200); 
			test.ok(signInRes.headers['set-cookie'] == undefined); 
			test.ok(signInRes.body != undefined); 
			resBody = signInRes.body; 
			var loginHeaderPatt = /signin.*login/gi; 
			var matches = resBody.match(loginHeaderPatt); 
			test.equals(matches.length, 1);
			test.done();
		});
	}
});
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
		// Login as user 
		client.sendRequest('POST', '/signin', { body : postBody }, function(signInRes) { 
			test.equals(signInRes.status, 302); 
			test.ok(signInRes.headers['set-cookie'] != undefined); 
			test.equals(signInRes.headers['location'], '/'); 
			// Follow redirection to '/'  
			client.sendRequest('GET', '/', { header : {'cookie': signInRes.headers['set-cookie']} }, function(idxRes) { 
				test.equals(idxRes.status, 200);
				test.ok(idxRes.body != undefined); 
				resBody = idxRes.body; 
				var loginHeaderPatt = /Welcome.*System/gi;  
				var matches = resBody.match(loginHeaderPatt); 
				test.equals(matches.length, 1); 
				// Log out and check for expired cookie 
				client.sendRequest('GET', '/signout', { header : {'cookie': signInRes.headers['set-cookie']} }, function(signOutRes) { 
					test.equals(signOutRes.status, 302);
					var cookie = signOutRes.headers['set-cookie']; 
					test.ok(cookie != undefined); 
					test.ok(client.isCookieExpired(cookie)); 
					test.equals(signOutRes.headers['location'], '/');
					test.done();
				}); 
			}); 
		});
	},
});
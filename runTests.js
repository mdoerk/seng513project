#!/usr/bin/env node
require.paths.unshift(__dirname + '/deps');

/*
* This is the runTests.js script. Run this with the command "node runTests.js" 
* from the command line to execute the tests in the test folder.
*
* Created By: Eric Kryski Feb. 23, 2011
*/

//The reporter is what actually runs the tests and prints out the output.
var reporter = require('nodeunit/nodeunit').reporters.default;

//Checking the command line arguments.
if (process.argv.length == 2) {
	console.log("Running all tests!");
	reporter.run(['test/unitTests/', 'test/funcTests/']);
}

else if (process.argv.length == 3) {

	switch (process.argv[2]) {
		
		//Use this flag if you only want to run the unit tests
		case '-u':
			console.log("Running all tests!");
			reporter.run(['test/unitTests/']);
			break;
			
		//Use this flag if you only want to run the functional tests
		case '-f':
			console.log("Running only functional tests!");
			console.log("You must have the server running for these to execute!!");
			reporter.run(['test/funcTests/']);
			break;
		default:
		// If you've made it here there are 3 arguments but they weren't the expected flags
		// so you must be passing a file or folder to run.
			console.log("Running tests in '" + process.argv[2] + "'");
			reporter.run(['test/' + process.argv[2]]);
	}
}
This is the repository for the course project of SENG 513.

# Basic Features #


## Dispatching and Error Handling ##

The dispatcher determines the required action based on the URL. Routes are defined
in /lib/routes.js.

Note that only files in /public are available to the outside world.

Please see /lib/routes.js for examples on how to register routes. Essentially, it 
is as simple as adding a new 'r.add' line under the existing routes. Notice that
you should omit the '/public' from the path when defining routes to static files.


## Basic Object Storage and Fixtures ##


## Testing Infrastructure ##

The test infrastructure is built upon the [nodeunit](https://github.com/caolan/nodeunit) open source testing platform which is in turn, is built upon the node assert module. Currently there is only unit testing with the nodeunit framework but there is planned implementation for functional tests to be integrated into nodeunit as well, so that you can test the requests you pass to the server and the responses you get back. For those of you that have done testing before this TDD style of testing should be somewhat familiar.

### Testing API ###
There are a number of tests that nodeunit makes available to you:

* **test.ok(value, [message])** - Tests if value is a true value.

* **test.equal(actual, expected, [message])** - Tests shallow, coercive equality with the equal comparison operator ( == ).

* **test.equals(actual, expected, [message])** - Tests shallow, coercive equality with the equal comparison operator ( == ).

* **test.notEqual(actual, expected, [message])** - Tests shallow, coercive non-equality with the not equal comparison operator ( != ).

* **test.deepEqual(actual, expected, [message])** - Tests for deep equality.

* **test.notDeepEqual(actual, expected, [message])** - Tests for any deep inequality.

* **test.strictEqual(actual, expected, [message])** - Tests strict equality, as determined by the strict equality operator ( === )

* **test.notStrictEqual(actual, expected, [message])** - Tests strict non-equality, as determined by the strict not equal operator ( !== )

* **test.throws(block, [error], [message])** - Expects block to throw an error.

* **test.doesNotThrow(block, [error], [message])** - Expects block not to throw an error.

* **test.ifError(value)** - Tests if value is not a false value, throws if it is a true value. Useful when testing the first argument, error in callbacks.

* **test.expect(amount)** - Specify how many assertions are expected to run within a test. Very useful for ensuring that all your callbacks and assertions are run.

* **test.done()** - Finish the current test function, and move on to the next. ALL tests should call this!

For more information please visit the nodeunit [README](https://github.com/caolan/nodeunit/blob/master/README.md).
### Creating Tests ###

To create a test or a series of tests open a new file called 'test-yourTestName.js'. Once you have done that you can add your tests to the file like this:

	//Include your modules that you will need
	var testCase = require('nodeunit').testCase;

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

You must make sure that you call test.done() at the end of each test as this ensures that your test was actually executed.  Because node is asynchronous, if you don not use the check test.done() then your test may not execute and give a false pass or false fail.

**Note**  
You must make sure that where you place 'test.done()' is within the right call back.
### Adding Tests to the Project ###

To add your tests to the project all you need to do is place the test file you created in 'test/unitTests' folder or the 'test/funcTests' folder.

### How Do I Run The Tests? ###

In order to run tests in the test folder there are a few different ways to do it:

* To run **all** tests simply type: 

	`node runTests.js`
	
* To run **all unit** tests type: 

	`node runTests.js -u`
	
* To run **all functional** tests type: 

	`node runTests.js -f`
	
* To run **a specific** test file or test folder just provide the path inside the 'test/' folder like this:

	`node runTests.js unitTests/test-yourTestName.js`
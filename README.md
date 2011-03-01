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

The basic object storage will handle inserting, finding, updating and deleting of records from
the database.
	
### Usage ###

First import the module in the file where you require to access the database by:
var dbAccess = require('dbAccess');

Creating the database from the .sql file, run the following commands on the terminal
	sqlite3 CivicConnect.db
	> .read schema.sql
	> .exit

#### CREATE ####
>> dbAccess.create(table, params, call_back)
create - insert a new row into the database
	1. table 		   STRING 	MANDATORY					- table to select from
	2. params  		   ARRAY								- Array containing all the variables
	3. call_back	   METHOD	MANDATORY					- return function
	
	Example: create('table_name', { values: 'column_1="value1"', 'column_2="value2"' }, callback);

#### FIND ####
>> dbAccess.find(table, params, call_back)
find - returns rows based on certain parameters.
	1. table 		   STRING 	MANDATORY					- table to select from
	2. params  		   ARRAY								- Array containing all the variables
		- properties   ARRAY 	OPTIONAL  [default: '*']	- columns to select. Ex: "SELECT id, date FROM table" properties is ['id', 'date']
	    - conditions   ARRAY	OPTIONAL  [default]			- column conditions. Ex: "SELECT id FROM table WHERE id=5" conditions is ['id=5']
	    - limit		   STRING	OPTIONAL  [default]			- limits the number of rows to passbac. Ex: "SELECT * FROM table LIMIT 10" limit is '10'
		- orderby	   STRING	OPTIONAL  [default]			- orders the resulting rows by a column and DESC or ASC. Ex: "SELECT * FROM table
																ORDERBY date DESC" orderby is 'date desc'
	3. call_back	   FUNCTON	MANDATORY					- returns the rows to the function to handle

 	Example: results = find('table_name', { properties:['id','date'], conditions:['id="4" OR id="5"','user_id="3"'], limit:5, orderby:'date asc' }, callback);
	
#### UPDATE ####
>> dbAccess.update(table, params, call_back)
update - updates row information.
	1. table 		   STRING 	MANDATORY					- table to select from
	2. params  		   ARRAY								- Array containing all the variables
		- values  	   ARRAY 	OPTIONAL  [default: '*']	- Array of columns and new values. Ex: ['id=5', 'title='new']
	    - conditions   ARRAY	OPTIONAL  [default]			- Array of conditions of which rows to be updated. Ex: ['id=5', 'user_id=1']
	3. call_back	   FUNCTON	MANDATORY					- return function

	Example: update('table_name', { values:['column_1="value"','column_2="value"'], conditions:['condition_1="value1"', 'condition_2="value2" OR condition_3="value3"'] }, callback);
	
#### DELETE ####
>> dbAccess.remove(table, params, call_back)
remove - updates row information.
	1. table 		   STRING 	MANDATORY					- table to select from
	2. params  		   ARRAY								- Array containing all the variables
	    - conditions   ARRAY	OPTIONAL  [default]			- Array of conditions of which rows to be updated. Ex: ['id=5', 'user_id=1']
	3. call_back	   FUNCTON	MANDATORY					- return function

	Example: remove('table_name', { conditions:['condition_1="value1"', 'condition_2="value2" OR condition_3="value3"'] }, callback);

#### RUN QUERY ####
>> dbAccess.runQuery(query, call_back)
this method is used if you would like to run your own query

	
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
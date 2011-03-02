This is the repository for the course project of SENG 513.

# Basic Features #

## Dispatching and Error Handling ##

The dispatcher determines the required action to call or resource to retrieve based on a given URL. 

### Usage ###
The dispatcher requires two components to be defined in order to properly route your requests: 
1) A route 
2) A specific function call or resource 

Routes are defined in '/lib/routes.js' and should be added using the 'r.add' under the existing routes.
Each route should be unique in this list.  

Only files located in the '/public' folder can be accessed by clients. 
Therefore, images, html files, and javascript files that need to be accessed by http clients should be placed in this folder or a subfolder within this folder.

If you want to route to a static file (e.g. foo.html), you should omit the '/public' from the path name.
For example, if I have a route to static file foo.html, the path would be: 
	r.add('/myroute', 'foo.html'); // CORRECT 
not: 
	r.add('/myroute', 'public/foo.html'); // INCORRECT 
	
### Example ###

Let's say we have a link on our web page:

	<html> 
		<body>
			<a href="/myroute">My Route</a> 
			<form method="post" action="/handleForm">
				<input type="text" /> 
				<input type="submit" /> 
			</form>
		</body>
	</html>

When the link is clicked (which generating a request for '/myroute'), we would like to to call a method 'foo()' in our JavaScript module 'FooBar':

	var FooBar = exports.FooBar = function() { 
		this.bar = 'bar';  
	};
	
	// The function we would like to call 
	FooBar.foo = function(req, res) {
		res.writeHead(200, { 'Content-Type' : 'text/html' }); 
		res.end('<html><body><h1>FooBar</h1></body></html>');
	}
	
In the routes.js file, add a new route for '/myroute' using the add() function: 

	var Router = require('./router').Router; 
	var TestModule = require('testModule').TestModule; 

	var r = new Router();

	/*
	 * Define routes here!
	 */
	r.add('/', 'index.html');
	r.add('/handleForm', FooBar.foo);	
	r.add('/myroute', FooBar.foo); // My added route 
	
Now when the link is clicked, you FooBar.foo() function is called with the request and response objects passed to it. 

## Database Access ##

To create the database file with the current schema run the following commands in the project directory:

	sqlite3 CivicConnect.db
	> .read schema.sql
	> .exit

For now, please, use the node-sqlite module to access the database from Node.

	var sqlite = require('sqlite');
	var db = new sqlite.Database();
	db.open("CivicConnect.db", function (error) {...});

See documentation on the [node-sqlite](https://github.com/orlandov/node-sqlite) module page

You may have to change the path to the database depending on where your module is located.

The basic object storage will handle inserting, finding, updating and deleting of records from
the database.
	
### Examples ###

First import the module in the file where you require to access the database by:
var dbAccess = require('dbAccess');

Creating the database from the .sql file, run the following commands on the terminal
sqlite3 CivicConnect.db
> .read create_tables.sql
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
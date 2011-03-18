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
	
For routes, it is usually good enough to define a route as a simple string as shown in previous examples.  
However, if you need to handle more dynamic routes you may also define a regular expression as a route. 
For example, say you would like to match routes like '/Issue/<Year>' (e.g. /Issues/2011', 'Issue/2010' etc). 
You could define your route like this: 
	r.add(/^\/Issues\/\d{4}$/, Issue.showIssue); 
	
### Example ###

Let's say we have a link 'My Route' on our web page:

	<html> 
		<body>
			<a href="/myroute">My Route</a> 
			<form method="post" action="/handleForm">
				<input type="text" /> 
				<input type="submit" /> 
			</form>
		</body>
	</html>

When the link is clicked (which generates a request for '/myroute'), we would like to to call a method 'foo()' in our JavaScript module 'FooBar':

	var FooBar = exports.FooBar = function() { 
		this.bar = 'bar';  
	};
	
	// THE FUNCTION TO CALL 
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
	r.add('/myroute', FooBar.foo); // MY ADDED ROUTE
	
Now when the link is clicked, you FooBar.foo() function is called with the request and response objects passed to it. 

## Basic Object Storage and Fixtures ##

The basic object storage will handle inserting, finding, updating and deleting of records from
the database.
	
### Examples ###

First import the module in the file where you require to access the database by:
var dbAccess = require('dbAccess');

To set up the production database environment simply type in the terminal:
	
	`node setupDB.js`

This will create a new copy of the 'CivicConnect.db' in the 'db/' folder that is populated with the sample data in the 'db/fixtures/' folder.  It will also make a backup copy called 'CivicConnect-back.db' of the previous existing database. Alternatively, if you want to create a test database simply type in the terminal:

	`node setupDB.js -t`

#### CREATE ####
>> dbAccess.create(table, params, call_back)
create - insert a new row into the database
	1. table 		   STRING 	MANDATORY					- table to select from
	2. params  		   OBJECT								- object containing all the variables
		- values	   ARRAY	MANDATORY					- data to be inserted.  Ex: "INSERT INTO table (a,b,c) VALUES ('x','y','z')" values is ['a="x"','b="y"','c="z"']
	3. call_back	   METHOD	OPTIONAL					- callback function can have two optional parameters. first one is error, second is 
																the id of the row that was just inserted

	Example: 
	create('table_name', { values:['column_1="value1"', 'column_2="value2"']}, function(error, rowId {
		if (error)
			// handle error
		else
			util.log("row successfully inserted with id " + rowId);
	});

#### FIND ####
>> dbAccess.find(table, params, call_back)
find - returns rows based on certain parameters.
	1. table 		   STRING 	MANDATORY					- table to select from
	2. params  		   OBJECT								- Object containing all the variables
		- properties   ARRAY 	OPTIONAL  [default: '*']	- columns to select. Ex: "SELECT id, date FROM table" properties is ['id', 'date']
	    - conditions   ARRAY	OPTIONAL  [default]			- column conditions. Ex: "SELECT id FROM table WHERE id=5" conditions is ['id="5"']
	    - limit		   STRING	OPTIONAL  [default]			- limits the number of rows to passbac. Ex: "SELECT * FROM table LIMIT 10" limit:10
		- orderby	   STRING	OPTIONAL  [default]			- orders the resulting rows by a column and DESC or ASC. Ex: "SELECT * FROM table
																ORDERBY date DESC" orderby:'date desc'
	3. call_back	   FUNCTON	MANDATORY					- returns the rows to the function to handle
	
 	Example: find('table_name', { properties:['id','date'], conditions:['id="4" OR id="5"','user_id="3"'], limit:5, orderby:'date asc' }, callback);
	-- where function callback(error, results) {..}
	-- var results will contain the result
	
#### UPDATE ####
>> dbAccess.update(table, params, call_back)
update - updates row information.
	1. table 		   STRING 	MANDATORY					- table to select from
	2. params  		   OBJECT								- Object containing all the variables
		- values  	   ARRAY 	OPTIONAL  [default: '*']	- Array of columns and new values. Ex: ['id="5"', 'title="new"']
	    - conditions   ARRAY	OPTIONAL  [default]			- Array of conditions of which rows to be updated. Ex: ['id="5"', 'user_id="1"']
	3. call_back	   FUNCTON	OPTIONAL					- return function for erors

	Example: update('table_name', { values:['column_1="value"','column_2="value"'], conditions:['condition_1="value1"', 'condition_2="value2" OR condition_3="value3"'] }, callback);
	
#### DELETE ####
>> dbAccess.remove(table, params, call_back)
remove - updates row information.
	1. table 		   STRING 	MANDATORY					- table to select from
	2. params  		   OBJECT								- Object containing all the variables
	    - conditions   ARRAY	OPTIONAL  [default]			- Array of conditions of which rows to be updated. Ex: ['id="5"', 'user_id="1"']
	3. call_back	   FUNCTON	OPTIONAL					- return function for errors

	Example: remove('table_name', { conditions:['condition_1="value1"', 'condition_2="value2" OR condition_3="value3"'] }, callback);

#### RUN QUERY ####
>> dbAccess.runQuery(query, call_back)
this method is used if you would like to run your own query,
if the query is SELECT, callback is expected to take in a result parameter:
-- function callback(error, results) {...}

	
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
	
## Tagging ##

This feature allows users to 'tag' issues. Users may enter a (space separated) list of tags when creating an 
issue, and the application will proceed as follows:
	
	1) addIssue() will create the issue in the issues table, in order to get the id of the new issue
	2) addIssue() will pass the issue id, as well as the relevant form data (what the user entered in the 'Tags' box) to the tagIssue(issueId, tags)
	3) tagIssue() will parse the tags and create a list of tags. addTag() is called for each tag
	4) this tag will be checked against the tags table
		i)  if it exists, we get the id of tag and return it
		ii) if it does not exist, we insert this new tag into the table return the id of this new tag
	5) a new row will be added to issuetags table describing this new tag relationship: 
		* 'INSERT INTO issuetags (issue_id, tag_id) VALUES (<issueId>, <tagId>);'

### Tagging API ###
**Load the tagging library:**
	var tags = require('tags');
* **tags.tagIssue(issueId, tags, function (error) {})** - Tags the provided _issueId_ with the provided _tags_ (a space-separated string of tags)
* **tags.getTagId(tag, function (error, tagId) {})** - Gets the id of a given _tag_ (tag is a single tag). tagId will be the id of the tag in the tags database table if it exists, or -1 if the tag is not in the table.
* **tags.addTag(tag, function (error, tagId) {})** - Attempts to add the given _tag_ to the tags table, and returns the id of the tag (if it already exists, will return the id of the existing tag, otherwise it will return the id of the newly inserted tag). If there is an error, tagId will be -1.
* **tags.getTags(issueId, function (error, results) {})** - Typically should not be called since it returns raw database results (use one of the following two instead). Looks up which tags are associated with the provided _issueId_. Returns raw database data.
* **tags.getTagsList(issueId, function (tagList) {})** - Looks up which tags are associated with the provided _issueId_. Returns a collection (List) of tags (strings), in alphabetical order. If there are no tags associated with the issue, the returned list will be empty. If there is an error, it will be logged and the returned collection will be empty.
* **tags.getTagsString(issueId, function (tagsString) {})** - Looks up which tags are associated with the provided _issueId_. Returns the tags as a string (space separated, alphabetical order). If there are no tags associated with the issue, the returned string will be empty. If there is an error, it will be logged and the returned string will be empty.
* **tags.getIssuesByTag(tag, function (issueIds) {})** - Looks up which issues are associated with the given tag. Returns a collection (List) of issue_ids. If there are no issues tagged with the given tag, the returned list will be empty. If there is an error, the error will be logged and the returned list will be empty.
* **tags.untagIssue(issueId, function (error) {})** - Removes all tags associated with the _issueId_ (removes the relevant rows in the 'issuetags' table, not the actual tags from the 'tags' table)
* **tags.updateTags(issueId, updatedTags, function (error) {})** - Used when editing an issue.. This function will update the tags for the given _issueId_ with the new tags (_updatedTags_)

### Example ###
	// Parse form data, create an issue (remember to get the id of the issue when creating it)
	tags.tagIssue(<issueId>, <tags separated by a space>, function(error) {
		if (error)
			// Handle error
		else
			// finish whatever you need to do
	});

## How To Check If The User Is Logged In ##

There is a a method in the request object called 'getUser'. This must be passed a callback method has two parameters (error, user). 'user' will be the user record from the 'users' table if he is logged in, it will be null otherwise.

### Example ###
	req.getUser(function(error, user){
		if (error)
			throw error;
		if (user){
			//user is logged in.
			//continue. 
		} 
		else {
			//user is not logged in.
			//maybe redirectTo('/login')
		}
	}); 


## Reputation System ##

### Description ###
For each user, an overall reputation score is recorded and updated to give an indication of
the level and quality of contributions made by the user.  

The reputation system is based on 'actions'.  For example, the action of adding an issue will improve the issue author's reputation by a certain number of points. 
It is also possible for 'actions' to affect the reputation of other users.  For example, a user voting up on a issue will affect both the voter and the issue author.  

### Adding Reputation Modifiers to Your Actions ###
A number of reputation modifiers have already been exposed in reputation.js.  
If you have an action such as adding/voting for issues/comments, make sure to include the appropriate reputation modifier in your code.  For example: 
	
	var reputation = require('reputation'); 
	reputation.updateOnAddComment(1, 1, comment); 

### Reputation API ###

* **reputation.updateOnSignUp(name, email)** - Updates reputation when a user signs up to the site
* **reputation.updateOnAddComment(issueId, userId, comment)** - Updates reputation for issue author and commenter when comment is added 
* **reputation.updateOnIssueUpVote(issueId, userId)** - Updates reputation for the issue author and commenter when an issue is voted up 
* **reputation.updateOnIssueDownVote(issueId, userId)** - Updates reputation for the issue author and commenter when an issue is voted down
* **reputation.updateOnCommentUpVote(commentId, userId)** - Updates reputation for the comment author and commenter when an comment is voted up
* **reputation.updateOnCommentDownVote(commentId, userId)** - Updates reputation for the comment author and commenter when an comment is voted down


## Parsing an address to latitude and longitude ##

### Instructions ###

* Load the parseAddr.js module:

		var parseAddr = require('parseAddr');
	
* Input an address string and get the results on callback:

		parseAddr.geocode("7205 4st ne calgary ab canada", function(location) {
			var lat = location.latitude; // lat = 78.02020
			var long = location.logitude; // long = -23.49482
		});
	
* If the input does not exist or validate, the "latitude" and "longitude" fields will be empty.

## Templating ##

For templating we've used [mustache.js](https://github.com/janl/mustache.js/). In it's simplest form you can call `response.render(viewPath);` where `viewPath` is the location of the path. For example, `response.render('views/signup.html');`

In many cases the view requires variables. In this case you pass them in a object like this:
	variables = { title: 'One time...', status: 'online', creator: user };
	response.render('views/viewIssue.html', variables);
The view itself is generated with mustache tags (`{{` and `}}`). For example,
	<h1> {{title}} </h1>
	Created on {{created}}
	{{#user}}
		by	<a href="/viewProfile?id={{user_id}}" id="user_profile">{{user_name}}</a>
	{{/user}}
	<br />
	Status: {{status}}<br/>
	Location: {{location}}
	<h3>Description</h3>
	<p>{{description}}</p>
Here are a few mustache command:
	{{a}} // prints the value of a
	{{#b}} prints if b is non-null {{/b}}
	{{^c}} prints is c is null {{/c}}
	{{{d}}}	// does not escape d (normal {{,}} will escape html strings.)
For more information on mustache.js see [https://github.com/janl/mustache.js/](https://github.com/janl/mustache.js/) or message
[codr](https://github.com/inbox/new/codr)

### Redirecting ###

Calling `response.redirectTo(path)` will generate a redirect HTTP 302. `path` is the url path, for example:
	res.redirectTo('/signin');

## Messages ##
folderids: 	0 = inbox
				1 = sent

### Messages API ###
**Load the messages library:**
	var messages = require('messages');
* **messages.sendMessage(fromId, toId, subject, body, function(error) {})**
* **messages.deleteMessage(folderId, messageId, function(error) {})**
* **messages.getMessages(userId, folderId, function(error, messageList) {})**
* **messages.getMessage(messageId, folderId, function(error, message) {})**



/**
* This file is the script that is used to set up the databases. To run it 
* simply type 'node setupDB.js' in the console. You'll want to run it to
* initialize the database or to set up a test database. The databases are
* created in the 'db/' folder.
* 
* created by: Eric Kryski March 4, 2011
**/

var sys = require('sys'),
path = require('path');

var exec = require('child_process').exec;
var DB = 'db/CivicConnect.db';
var TEST_DB = 'db/CivicConnect-test.db';


// Callback function that prints out the stdout, stderr, and checks 
// for an exec error.

function puts(error, stdout, stderr) { 
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
	else{
		console.log("*****************************************************************");
		console.log("Your Database: is set up!  You are good to go!!");	
	}

}

// This checks to see if the -t flag has been passed in. If a test db 
// already exists we remove it and set up a new one with the sample data
// in the fixtures folder. If a test db didn't already exist we create one.

if (process.argv.length == 3) {
	if (process.argv[2] == '-t')
	{
		var filename = path.join(process.cwd(), TEST_DB);  
		path.exists(filename, function(exists) {  
			if(!exists) {
				exec("echo cd db; cd db; echo sqlite3 CivicConnect-test.db <fixtures/dbSetup.sql; sqlite3 CivicConnect-test.db <fixtures/dbSetup.sql;", puts);
			}
			else
			{
				exec("echo rm "+TEST_DB+"; rm "+TEST_DB+"; echo cd db; cd db; echo sqlite3 CivicConnect.db <fixtures/dbSetup.sql; sqlite3 CivicConnect.db <fixtures/dbSetup.sql;", puts);
			}
		});
	}
}

// No arguments were passed so we'll set up the production db. If it
// already exists we make a backup and create a fresh copy with the
// sample data in the fixtures folder.  If the db doesn't exist we
// create and populate it.

else {
	var filename = path.join(process.cwd(), DB);  
	path.exists(filename, function(exists) {  
		if(!exists) {
			exec("echo cd db; cd db; echo sqlite3 CivicConnect.db <fixtures/dbSetup.sql; sqlite3 CivicConnect.db <fixtures/dbSetup.sql;", puts);
		}
		else
		{
			exec("echo cd db; cd db; echo cp CivicConnect.db CivicConnect-back.db; cp CivicConnect.db CivicConnect-back.db; echo sqlite3 CivicConnect.db <fixtures/dbSetup.sql; sqlite3 CivicConnect.db <fixtures/dbSetup.sql;", puts);
		}
	});
}
=================================================================================================
DATABASE
=================================================================================================

Tables (Schema)
-------------------------------------------------------------------------------------------------
	
	users {
		id				int PRIMARY KEY AUTOINCREMENT
		name			text
		email			text
		password		text
		neighborhood	text
		postal_code		text
	}
	
	issues {
		id				int PRIMARY KEY AUTOINCREMENT
		user_id			int
		created			datetime
		lastModified	datetime
		status			text
		title			text
		description		text
		link			text
		location		text
	}
	
	comments {
		id				int PRIMARY KEY AUTOINCREMENT
		user_id			int
		issue_id		int
		created			datetime
		content			text
	}
	

Usage
-------------------------------------------------------------------------------------------------

>> var dbAccess = require('./dbAccess');

###### CREATE ######################################################
>> dbAccess.create(table, params, call_back)
create - insert a new row into the database
	1. table 		   STRING 	MANDATORY					- table to select from
	2. params  		   ARRAY								- Array containing all the variables
		Example: { title:'hello world', content:'blah blah blah' }
	3. call_back	   METHOD	MANDATORY					- return function
	
	Example: create('table_name', { table_column1:'value', table_column2:'value' }, callback);


###### FIND ######################################################
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

 	Example: results = find('table_name', { properties:['id','date'], conditions:['id=4 OR id=5','user_id=3'], limit:5, orderby:'date asc' }, callback);
	
	
###### UPDATE ######################################################
>> dbAccess.update(table, params, call_back)
update - updates row information.
	1. table 		   STRING 	MANDATORY					- table to select from
	2. params  		   ARRAY								- Array containing all the variables
		- values  	   ARRAY 	OPTIONAL  [default: '*']	- Array of columns and new values. Ex: ['id=5', 'title='new']
	    - conditions   ARRAY	OPTIONAL  [default]			- Array of conditions of which rows to be updated. Ex: ['id=5', 'user_id=1']
	3. call_back	   FUNCTON	MANDATORY					- return function

	Example: update('table_name', { values:['column_1=value','column_2=value'], conditions:['condition_1', condition_2 OR condition_3'] }, callback);
	
 
###### DELETE ######################################################
>> dbAccess.remove(table, params, call_back)
remove - updates row information.
	1. table 		   STRING 	MANDATORY					- table to select from
	2. params  		   ARRAY								- Array containing all the variables
	    - conditions   ARRAY	OPTIONAL  [default]			- Array of conditions of which rows to be updated. Ex: ['id=5', 'user_id=1']
	3. call_back	   FUNCTON	MANDATORY					- return function

	Example: remove('table_name', { conditions:['condition_1', condition_2 OR condition_3'] }, callback);


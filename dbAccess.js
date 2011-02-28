var sqlite = require('sqlite');
	db = new sqlite.Database();
	qs = require('querystring');
	util = require('util');

/*
 * create - insert a new row into the database
 *		1. table 		   STRING 	MANDATORY					- table to select from
 *		2. params  		   ARRAY								- Array containing all the variables
 *			Example: { title:'hello world', content:'blah blah blah' }
 *		3. call_back	   METHOD	MANDATORY					- return function
 *		
 *		Example: create('table_name', { table_column1:'value', table_column2:'value' }, callback);
 */
exports.create function (table, param, call_back)
{
	db.open('CivicConnect', function(error) {
		if (error) {
			util.log('error opening db');
			throw error;
		}
		
		switch (table){
			case 'users':
				//--- CREATE USER
				db.execute('INSERT INTO users (name, email, password, neighborhood, postal_code) VALUES (?,?,?,?,?)'
				, [param.name, param.email, param.password, param.neighborhood, param.postal_code]
				, function (error, rows){
					if (error) {
						util.log('error inserting');
						throw error;
					}
					db.close(function (error) {	call_back(); });
				});	
				break;
			case 'issues':
				//--- CREATE ISSUE
				db.execute('INSERT INTO issues (user_id, status, title, description, link, location) VALUES (?,?,?,?,?,?)'
				, [param.user_id, param.status, param.title, param.description, param.link, param.location]
				, function (error, rows){
					if (error) {
						util.log('error inserting');
						throw error;
					}
					db.close(function (error) {	call_back();});
				});	
				break;
			case 'comments':
				//--- CREATE COMMENT
				db.execute('INSERT INTO comments (user_id, issue_id, content) VALUES (?,?,?)'
				, [param.user_id, param.issue_id, param.content]
				, function (error, rows){
					if (error) {
						util.log('error inserting');
						throw error;
					}
					db.close(function (error) { call_back(); });
				});	
				break;
			default:
				util.log('Type not Recognized');
		}
		
	});
}
/*
 * find - returns rows based on certain parameters.
 *		1. table 		   STRING 	MANDATORY					- table to select from
 *		2. params  		   ARRAY								- Array containing all the variables
 *			- properties   ARRAY 	OPTIONAL  [default: '*']	- columns to select. Ex: "SELECT id, date FROM table" properties is ['id', 'date']
 *		    - conditions   ARRAY	OPTIONAL  [default]			- column conditions. Ex: "SELECT id FROM table WHERE id=5" conditions is ['id=5']
 *		    - limit		   STRING	OPTIONAL  [default]			- limits the number of rows to passback. Ex: "SELECT * FROM table LIMIT 10" limit is '10'
 *			- orderby	   STRING	OPTIONAL  [default]			- orders the resulting rows by a column and DESC or ASC. Ex: "SELECT * FROM table
 *																	ORDERBY date DESC" orderby is 'date desc'
 *		3. call_back	   FUNCTON	MANDATORY					- returns the rows to the function to handle
 *
 *	 	Example: find('table_name', { properties:['column_1','column_2'], conditions:['condition_1', condition_2 OR condition_3'], limit:number, orderby:'column_3 desc/asc' }, callback);
 */
exports.find function (table, params, call_back)
{
	// DEFAULT VALUES
	params.properties = params.properties || new Array();
	params.conditions = params.conditions || new Array();
	params.limit = params.limit || -1;
	params.orderby = params.orderby || '';
	// 1. SELECT WHAT
	var query = "SELECT ";
	// PROPERTIES
	if(params.properties.length==0) { query +="*"; } else 
	{
		for(var index in params.properties)
		{
			query += params.properties[index];
			if(index != params.properties.length-1)
				query += ",";
		}
	}
	// 2. FROM TABLE
	query += " FROM " + table;
	// 3. WHERE CONDITIONS
	if(params.conditions.length > 0)
	{
		query +=" WHERE ";
		for(var index in params.conditions)
		{
			query += params.conditions[index];
			if(index != params.conditions.length-1)
				query += " AND ";
		}
	}
	// 4. ORDERBY
	if(params.orderby.length>0)
		query += " ORDER BY " + params.orderby;
	// 5. LIMIT
	if(params.limit!=-1)
		query += " LIMIT " + params.limit;
	// EXECUTE QUERY
	db.open('CivicConnect', function(error) {
		db.prepare(query, function (error, statement) {
			if (error) throw error;
			// Fill in the placeholders
			statement.bindArray([''], function () {
				statement.fetchAll(function (error, rows) {
					statement.finalize(function (error) {
						call_back(rows);
					});
				});
			});
		});
	});
}
/*
 * update - updates row information.
 *		1. table 		   STRING 	MANDATORY					- table to select from
 *		2. params  		   ARRAY								- Array containing all the variables
 *			- values  	   ARRAY 	OPTIONAL  [default: '*']	- Array of columns and new values. Ex: ['id=5', 'title='new']
 *		    - conditions   ARRAY	OPTIONAL  [default]			- Array of conditions of which rows to be updated. Ex: ['id=5', 'user_id=1']
 *		3. call_back	   FUNCTON	MANDATORY					- return function
 *
 *	 	Example: update('table_name', { values:['column_1=value','column_2=value'], conditions:['condition_1', condition_2 OR condition_3'] }, callback);
 */
exports.update function (table, params, call_back)
{
	// DEFAULT VALUES
	params.values = params.values || new Array();
	params.conditions = params.conditions || new Array();

	// 1. UPDATE WHAT
	var query = "UPDATE ";
	// 2. FROM TABLE
	query += table;
	// 3. SET VALUES
	if(params.values.length > 0)
	{
		query +=" SET ";
		for(var index in params.values)
		{
			query += params.values[index];
			if(index != params.values.length-1)
				query += ",";
		}
	}
	// 4. WHERE CONDITIONS
	if(params.conditions.length > 0)
	{
		query +=" WHERE ";
		for(var index in params.conditions)
		{
			query += params.conditions[index];
			if(index != params.conditions.length-1)
				query += " AND ";
		}
	}
	// EXECUTE QUERY
	db.open('CivicConnect', function(error) {
		db.execute(query, function (error, rows){
			if (error) {
				util.log('Error Updating');
				throw error;
			}
			db.close(function (error) {call_back();});
			
		});
	});
}
/*
 * remove - updates row information.
 *		1. table 		   STRING 	MANDATORY					- table to select from
 *		2. params  		   ARRAY								- Array containing all the variables
 *		    - conditions   ARRAY	OPTIONAL  [default]			- Array of conditions of which rows to be updated. Ex: ['id=5', 'user_id=1']
 *		3. call_back	   FUNCTON	MANDATORY					- return function
 *
 *	 	Example: remove('table_name', { conditions:['condition_1', condition_2 OR condition_3'] }, callback);
 */
exports.remove function (table, params, call_back)
{
	// DEFAULT VALUES
	params.conditions = params.conditions || new Array();
	// 1. DELETE WHAT
	var query = "DELETE ";
	// 2. FROM TABLE
	query += " FROM " + table;
	// 3. WHERE CONDITIONS
	if(params.conditions.length > 0)
	{
		query +=" WHERE ";
		for(var index in params.conditions)
		{
			query += params.conditions[index];
			if(index != params.conditions.length-1)
				query += " AND ";
		}
		// EXECUTE QUERY
		db.open('CivicConnect', function(error) {
			db.execute(query, function (error, rows){
				if (error) {
					util.log('Error Updating');
					throw error;
				}
				db.close(function (error) {call_back();});
			});
		});
	}
}
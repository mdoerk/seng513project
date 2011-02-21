var sqlite = require('sqlite');
	db = new sqlite.Database();
	qs = require('querystring');
	
// Create (type, content)
//		type = "user" or "issue" or "comment"
//		content = object returned by querystring.parse(data);
//		
function create(type, content)
{
	db.open('test', function(error) {
		if (error) {
			util.log('error opening db');
			throw error;
		}
		
		switch (type){
			case 'user':
				//--- CREATE USER
				db.execute('INSERT INTO users (name, email, password, neighborhood, postal_code) VALUES (?,?,?,?,?)'
				, [post['name'], post['email'], post['password'], post['neighborhood'], post['postalCode']]
				, function (error, rows){
					if (error) {
						util.log('error inserting');
						throw error;
					}
					db.close(function (error) {});
				});	
				break;
			case 'issue':
				//--- CREATE ISSUE
				db.execute('INSERT INTO issues (user_id, status, title, description, link, location) VALUES (?,?,?,?,?,?)'
				, [post['userID'], post['status'], post['title'], post['description'], post['link'], post['location']]
				, function (error, rows){
					if (error) {
						util.log('error inserting');
						throw error;
					}
					db.close(function (error) {});
				});	
				break;
			case 'comment':
				//--- CREATE COMMENT
				db.execute('INSERT INTO comments (user_id, issue_id, content) VALUES (?,?,?)'
				, [post['userID'], post['issueID'], post['content']]
				, function (error, rows){
					if (error) {
						util.log('error inserting');
						throw error;
					}
					db.close(function (error) {});
				});	
				break;
			default:
				util.log('Type not Recognized');
		}
		
	});
}
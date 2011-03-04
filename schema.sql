DROP TABLE users; 
CREATE TABLE users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT NOT NULL,
		password TEXT NOT NULL,
		neighborhood TEXT,
		postal_code TEXT,
		created DATETIME DEFAULT CURRENT_TIMESTAMP,
		reputation_score INTEGER,
		isEditor BOOLEAN
		);

DROP TABLE issues;		
CREATE TABLE issues (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		created DATETIME DEFAULT CURRENT_TIMESTAMP,
		lastModified DATETIME DEFAULT CURRENT_TIMESTAMP,
		status TEXT,
		title TEXT,
		description TEXT,
		link TEXT,
		location TEXT,
		tags TEXT
		);

DROP TABLE comments;
CREATE TABLE comments (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		issue_id INTEGER NOT NULL,
		created DATETIME DEFAULT CURRENT_TIMESTAMP,
		content TEXT
		);

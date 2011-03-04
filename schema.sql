CREATE TABLE users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT NOT NULL,
		password TEXT NOT NULL,
		neighborhood TEXT,
		postal_code TEXT
		);
		
CREATE TABLE issues (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		created DATETIME DEFAULT CURRENT_TIMESTAMP,
		lastModified DATETIME DEFAULT CURRENT_TIMESTAMP,
		status TEXT,
        title TEXT,
		description TEXT,
		link TEXT,
		location TEXT
		);
		
CREATE TABLE comments (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		issue_id INTEGER NOT NULL,
		created DATETIME DEFAULT CURRENT_TIMESTAMP,
		content TEXT
		);

CREATE TABLE keywords (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		keyword TEXT,
		UNIQUE (keyword)
		);

CREATE TABLE indexTable (
		keyword_id INTEGER NOT NULL,
		issue_id INTEGER NOT NULL,
		PRIMARY KEY (keyword_id, issue_id)
		);
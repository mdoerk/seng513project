DROP TABLE users; 
CREATE TABLE users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT NOT NULL,
		password TEXT NOT NULL,
		neighborhood TEXT,
		postal_code TEXT,
		created DATETIME DEFAULT CURRENT_TIMESTAMP,
		reputation_score INTEGER
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
		tags TEXT,
		link TEXT,
		location TEXT
);

DROP TABLE comments;
CREATE TABLE comments (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		issue_id INTEGER NOT NULL,
		created DATETIME DEFAULT CURRENT_TIMESTAMP,
		content TEXT
		);

DROP TABLE votes;		
CREATE TABLE votes (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		issue_id INTEGER NOT NULL,
		vote INTEGER NOT NULL
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
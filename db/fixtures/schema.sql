DROP TABLE IF EXISTS users; 
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

DROP TABLE IF EXISTS issues;
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

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		issue_id INTEGER NOT NULL,
		created DATETIME DEFAULT CURRENT_TIMESTAMP,
		content TEXT
		);

-- Table storing tags (each one must be unique, enforced by the tags.addTag method), each with a corresponding id
DROP TABLE IF EXISTS tags;
CREATE TABLE tags (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	tag TEXT
);

-- Table used for defining the many to many relationship between tags and issues
DROP TABLE IF EXISTS issuetags;
CREATE TABLE issuetags (
	issue_id INTEGER,
	tag_id INTEGER
);

DROP TABLE IF EXISTS votes;		
CREATE TABLE votes (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		issue_id INTEGER NOT NULL,
		vote INTEGER NOT NULL
		);
		
DROP TABLE IF EXISTS follows;
CREATE TABLE follows (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		issue_id INTEGER NOT NULL
		);


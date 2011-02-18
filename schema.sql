CREATE TABLE issues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    creation_date date,
    status TEXT,
    title TEXT,
    description TEXT,
    link TEXT,
    location TEXT
);

INSERT INTO issues(user_id, created, status, title, description, link, location)
VALUES (0, '10/02/11', 'open', 'First Issue', 'Here the first issue for tests', 'http://google.ca', 'calgary');

INSERT INTO issues(user_id, created, status, title, description, link, location)
VALUES (1, '16/02/11', 'open', 'Second Issue', 'Here the second issue for tests', 'http://dvrshark.com', 'calgary');

INSERT INTO issues(user_id, created, status, title, description, link, location)
VALUES (1, '17/02/11', 'closed', 'Third Issue', 'Hail Damage to uninsurable property', 'http://dvrshark.com', 'calgary');

/* password: acbd18db4cc2f85cedef654fccc4a4d8 = 'foo' */
INSERT INTO users(name, email, password)
VALUES ('john', 'john@example.com', 'acbd18db4cc2f85cedef654fccc4a4d8');

INSERT INTO users(name, email, password)
VALUES ('jane', 'jane@example.com', 'acbd18db4cc2f85cedef654fccc4a4d8');
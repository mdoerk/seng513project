/*
 *  Fixtures for the users table
 */


/*	name:'one' email:'one' password:'two' */
INSERT INTO users (name, email, password) VALUES ('one', 'one', 'b8572e307fcb2694778271edc56638cf7ee68969');
/* Note: this password hash no longer works, it was uses with sha1. we're now using md5 hash. */
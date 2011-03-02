/*
 * Add new routes to the router
 * 
 * Route paths can be either strings or regular expressions. 
 * There is a slight performance hit when utilizing regular expressions 
 * due to the overhead have to compile and test the expressions. 
 * Routes can be associated with a static resource (e.g. somepage.html), 
 * or a function call defined in another module.  
 */ 

var Router = require('./router').Router; 
<<<<<<< HEAD
var TestModule = require('../modules/testModule').TestModule; 
var ViewIssue = require('../modules/viewIssue').ViewIssue;
=======
var TestModule = require('testModule').TestModule; 
>>>>>>> 2931456883384e07681c0c380e972e731191e3be

var r = new Router();

/*
 * Define routes here!
 */
r.add('/', 'index.html'); 
r.add('/foo', TestModule.foo); 
r.add('/fooBar', TestModule.fooBar);
<<<<<<< HEAD
r.add('/viewIssue', ViewIssue.display);
r.add(/^\/\d{3}$/, 'static.html'); 
r.add(/^\/home$/, 'static.html'); 
=======
r.add(/^\/\d{3}$/, 'about.html'); 
r.add(/^\/home$/, 'about.html'); 
>>>>>>> 2931456883384e07681c0c380e972e731191e3be


exports.router = r;

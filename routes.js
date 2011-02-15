/*
 * Add new routes to the router
 * 
 * Two types of routes can be added: string routes and regular expressions routes. 
 * Routes can be associated with either a static resource (e.g. somepage.html), 
 * or a function call.  
 */ 
 
var Router = require('./router').Router; 
var TestModule = require('./testModule').TestModule; 

var r = new Router(); 
r.add('/', 'index.html'); 
r.add('/foo', TestModule.foo); 
r.add('/fooBar', TestModule.fooBar); 
r.addRoutePattern('^\\/\\d{3}$', 'static.html'); 

exports.router = r;
 
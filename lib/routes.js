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
var TestModule = require('../public/testModule').TestModule; 
var fl = require('./fileLoader');

var r = new Router(); 
r.add('/', 'public/index.html'); 
r.add('/foo', TestModule.foo); 
r.add('/fooBar', TestModule.fooBar);
r.add(/^\/\d{3}$/, 'public/static.html'); 
r.add(/^\/home$/, 'public/static.html'); 

exports.router = r;

//load Controllers
fl.fileLoader.call(this, 'app/controllers/', function(controllers){ //dirty work around
	r.add('/signIn', this.signInController.index);
});
//load Models
fl.fileLoader('app/models/');

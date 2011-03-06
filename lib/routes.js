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
var ViewIssue = require('viewIssue').ViewIssue;
var ViewProfile = require('viewProfile').ViewProfile;
var SearchIssue = require('searchIssue').SearchIssue;
var TestModule = require('testModule').TestModule; 
var EditIssue = require('editIssue').EditIssue;
var SaveIssue = require('saveIssue').SaveIssue;
var signupModule = require('signupModule').SignupModule;
var ListIssues = require('listIssues').ListIssues;
var VoteIssues = require('voteIssues').VoteIssues;
var editProfileModule = require('editProfileModule').EditProfileModule;
var AddIssue = require('addIssue').AddIssue;

var r = new Router();

/*
 * Define routes here!
 */
r.add('/signup', signupModule.handleSignup); 
r.add('/editProfile', editProfileModule.buildEditProfilePage); 
r.add('/handleEditProfile', editProfileModule.handleEditProfile); 
r.add('/foo', TestModule.foo); 
r.add('/fooBar', TestModule.fooBar);
r.add('/viewIssue', ViewIssue.display);
r.add('/listIssues', ListIssues.display);
r.add('/viewProfile', ViewProfile.display);
r.add('/editIssue', EditIssue.display);
r.add('/saveIssue', SaveIssue.display);
r.add('/addIssue', 'add.html');
r.add('/add', AddIssue.add); 
r.add('/signin', signInModule.index);
r.add('/signout', signInModule.signout);
r.add('/index.html', ListIssues.display);
r.add('/', ListIssues.display);
r.add('/voteIssues', VoteIssues.display);
r.add('/searchIssue', SearchIssue.display);
r.add(/^\/\d{3}$/, 'about.html'); 
r.add(/^\/home$/, 'about.html');
r.add('/static', 'static.html');
r.add('/add', AddIssue.add); 

exports.router = r;

/* route.js 
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
var EditIssue = require('editIssue').EditIssue;
var SaveIssue = require('saveIssue').SaveIssue;
var signupModule = require('signupModule').SignupModule;
var ListIssues = require('listIssues').ListIssues;
var VoteIssues = require('voteIssues').VoteIssues;
var editProfileModule = require('editProfileModule').EditProfileModule;
var AddIssue = require('addIssue').AddIssue;
var signInModule = require('signInModule');
var FollowIssue = require('followIssue').FollowIssue;
var PopularTags = require('popularTags').PopularTags;
var SaveInterest = require('saveInterest').SaveInterest;
var PersonalFeed = require('personalFeed');
var MessageCenter = require('messageInterface');
var VoteComments = require('voteComments').VoteComments;
var followUser = require('followUser'); 
var Autocomplete = require('autocomplete').Autocomplete;
var GetTags = require('getTags').GetTags;
var SearchTagIssue = require('searchTagIssue').SearchTagIssue;
//var viewMessage = require('messageInterface').viewMessage;
//var NewMessage = require('messageInterface').NewMessage;
var EditComments = require('editComments').EditComments;
var DeleteComments = require('deleteComments').DeleteComments;
var About = require('about').About;

var r = new Router();

/*
 * Define routes here!
 */
r.add('/', ListIssues.display);
r.add('/signup', signupModule.handleSignup); 
r.add('/editProfile', editProfileModule.buildEditProfilePage); 
r.add('/saveInterest', SaveInterest.handleSave);
r.add('/handleEditProfile', editProfileModule.handleEditProfile); 
r.add('/viewIssue', ViewIssue.display);
r.add('/getTags', GetTags.search);
r.add('/addcomments', ViewIssue.addcomments)
r.add('/followIssue', FollowIssue.followIssue);
r.add('/unfollowIssue', FollowIssue.unfollowIssue);
r.add('/followUser', followUser.follow); 
r.add('/unfollowUser', followUser.unfollow); 
r.add('/listIssues', ListIssues.display);
r.add('/listTagIssues', SearchTagIssue.display);
r.add('/viewProfile', ViewProfile.display);
r.add('/popularTags', PopularTags.display);
r.add('/editIssue', EditIssue.display);
r.add('/saveIssue', SaveIssue.display);
r.add('/index.html', ListIssues.display);
r.add('/voteIssues', VoteIssues.display);
r.add('/static', 'static.html');
r.add('/fieldValidations.js', 'fieldValidations.js');
r.add('/add', AddIssue.add); 
r.add('/addIssue', AddIssue.display); 
r.add('/signin', signInModule.signin);
r.add('/signout', signInModule.signout);
r.add('/personalFeed', PersonalFeed.display); 
r.add('/messages', MessageCenter.ListMessages.display);
r.add('/sendMessage', MessageCenter.SendMessage.send);
r.add('/voteComments', VoteComments.display);
r.add('/viewMessage', MessageCenter.viewMessage.display);
r.add('/newMessage', MessageCenter.NewMessage.display);
r.add('/deleteMessage', MessageCenter.DeleteMessage);
r.add('/autocomplete', Autocomplete.getList);
r.add('/editComments', EditComments.display);
r.add('/deleteComments', DeleteComments.display);
r.add('/saveComments', EditComments.save);
r.add('/confirmDeleteComments', DeleteComments.confirmed);
r.add('/about', About.display);

exports.router = r;

var rendered = false;
var viewRoot = 'app/views/';
var router = require('../../lib/routes').router;

var applicationController = exports.applicationController = function(){
	
}

exports.render = function(view, req, res){
	if(rendered)
		throw 'View already rendered';
	render = true;
	
	console.log(arguments.callee);
	
	viewPage = viewRoot + 'signIn/signIn.html';
	router.handle(viewPage, req, res);
}
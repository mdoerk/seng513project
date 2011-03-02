var util = require('util');


//this.__proto__ = require('./applicationController'); //superclass
//util.inherits(this, require('./applicationController'));

var signInController = exports.signInController = function(){
	
}
this.prototype = require('./applicationController');

exports.index = signInController.index = function(req, res){
	if(req.method != 'POST'){
		console.log('debug: ' + arguments.callee.caller.name );
		console.log('dubug: ' + util.inspect(arguments.callee.caller.caller));
		render('signIn', req, res);
		return;
	}
		
	req.content = '';
	
	req.on('data', function(chunk){
		req.content += chunk;
	})
	
	req.on('end', function(){
		parseParameters(req.content);
	
		var params = req.params
	
		user.authenticate(params.username, params.password, function (authenticated){
		
			if(authenticated){
				redirectTo(index);
			}else{
				error = 'Sign in failed.';
				body = 'signIn';
			}
		
		})
	})
}


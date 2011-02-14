
this.__proto__ = applicationController; //superclass

exports.index = function(){
//	if(this.request.method != 'POST') // the request should be global to the controllers
//		return;
	
	user.authenticate(params.username, params.password, function (authenticated){
		
		if(authenticated){
			redirectTo(index);
		}else{
			error = 'Sign in failed.';
			body = 'signIn';
		}
		
	})
}


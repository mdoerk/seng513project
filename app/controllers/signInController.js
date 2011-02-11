
this.prototype = somthing;

index = fuction(){
	if(request.method != 'POST') // the request should be global to the controllers
		return;
	var user = user.authenticate(requst.username, request.password, function (authenticated){
		
		if(authenticated){
			redirectTo(index);
		}else{
			error = 'Sign in failed.';
			body = 'signIn';
		}
		
	})
}


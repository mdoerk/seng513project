/*
 * This .js File is used to have simple access to the javascript that will check to see if a form is valid or not.
 * This will be used when a form has fields that need to be checked before the form is submitted.
 * A function is created for the check of each different field then are used within a Validate function (eg. signupValidate(form), editProfileValidate(form)
 */		
		
/* 
 * signupValidate - This function call the checks for the fields that are specifically required for the signup form
 * Arguements
 * - form - this is the form that is being validated
 *
 * For the signup form to be valid the following fields must be filled out:
 * - username
 * - email (this field is currently checked to see if the string is in a formate that resembles an email)
 * - password (only limit is that this cannot me null)
 * - confirm_password (this must match the new_password field)
 */		
function signupValidate(form) {
	var e = form.elements;
	var valid = true;
		
	//Clears previous error messages each time validate is called.
	for(var i=0; i<e.length; i++) {
		if(e[i].hasError){
			var old = e[i].parentNode.removeChild(e[i].hasError);
			e[i].hasError = null;
		}
	}
		
	var check1 = validateUsername(e);
	var check2 = validateEmail(e);
	var check3 = validateNewPassword(e);
	var check4 = validateConfirmPassword(e);
	
	if(!check1 || !check2 || !check3 || !check4){
		valid = false;
	}
		
	return valid;
}
		
/* 
 * editProfileValidate - This function call the checks for the fields that are specifically required for the editProfile form
 * Arguements
 * - form - this is the form that is being validated
 *
 * For the editProfile form to be valid the following fields must be filled out:
 * - username (this field will be filled with the current username at the start but the update cannot happen if it becomes empty)
 * - email (this field will be filled with the current email at the start but will not update if it becomes empty or not in email format)
 * - password (the current password is needed to be able to edit any of the profile data)
 * - confirm_password (this must match the new_password field **ONLY if there is something entered into the new_password field**)
 */		
function editProfileValidate(form) {
	var e = form.elements;
	var valid = true;
	
	//Clears previous error messages each time validate is called.
	for(var i=0; i<e.length; i++) {
		if(e[i].hasError){
			var old = e[i].parentNode.removeChild(e[i].hasError);
			e[i].hasError = null;
		}
	}
		
	var check1 = validateUsername(e);
	var check2 = validateEmail(e);
	var check3 = validatePassword(e);
	var check4 = true;
	if(e['new_password'].value){
		check4 = validateConfirmPassword(e);
	}
	if(!check1 || !check2 || !check3 || !check4){
		valid = false;
	}
		
	return valid;
} 

/*
 * writeError - This function will create a new span element containing the error message and append it to the current field
 * Arguements
 * - obj - the field that is being check
 * - msg - the error message that will be appended
 */
function writeError(obj, msg) {
	var sp = document.createElement('span');
	sp.className = 'error';
	sp.appendChild(document.createTextNode(msg));
	obj.parentNode.appendChild(sp);
	obj.hasError = sp;
}
	
/*
 * emailFormatValidate - This function checks to see if the string in the email field resembles the form of an email.
 * Arguements
 * - email - the value found in the email field
 *
 * A valid email form is defined as follows:
 * - there must be an @ symbol
 * - there must be an . symbol
 * - there can only be one @ symbol
 * - the @ symbol must come before the last . symbol
 * - there must be some other symbols in between the @ and last . symbols
 * - the first @ symbol cannot be the first in the field
 * - the last . symbol cannot be the last in the field
 */		
function emailFormatValidate(email){
	var index_firstat = email.indexOf('@');
	var index_firstdot = email.indexOf('.');
	var index_lastat = email.lastIndexOf('@');
	var index_lastdot = email.lastIndexOf('.');
	if(index_firstat != -1 && index_firstdot != -1 && (index_firstat+1)<index_lastdot && index_lastdot<(email.length-1) && index_firstat!=0 && index_firstat == index_lastat)
		return true;
	return false;
}
	
/*
 * validateUsername - This function checks to validity of an input username.
 * **NOTE** Currently this function only checks if the username field is filled, it does not check to see if the user exists.
 * Arguements
 * - e - The array of elements from the form. It is used in the form e[#] for a specific index or e[''] for the specific name of an element.
 */
function validateUsername(e){
	if(!e['username'].value) {
		writeError(e['username'], '  This field is required.');
		return false;
	}
	return true;
}
	
/*
 * validateEmail - This function checks to validity of an input email field.
 * **NOTE** Currently this function only checks if the email field is filled, and if the string resembles an email format.
 * 			This does not check if the it is an existing email or if it is in the database.
 * Arguements
 * - e - The array of elements from the form. It is used in the form e[#] for a specific index or e[''] for the specific name of an element.
 */
function validateEmail(e){
	if(!e['email'].value) {
		writeError(e['email'], '  This field is required.');
		return false;
	}
	// if the email field is filled but does not resemble the form or an email an error is written 
	else if(!emailFormatValidate(e['email'].value)){
		writeError(e['email'], '  Not an email address.');
		return false;
	}
	return true;
}

/*
 * validateNewPassword - This function checks to validity of an input new password field.
 * **NOTE** Currently this function only checks if the new_password field is filled, it does not put any other limits on the new password.
 * Arguements
 * - e - The array of elements from the form. It is used in the form e[#] for a specific index or e[''] for the specific name of an element.
 */
function validateNewPassword(e){
	if(!e['new_password'].value) {
		writeError(e['new_password'], '  This field is required.');
		return false;
	}
	return true;
}

/*
 * validatePassword - This function checks to validity of an input password field.
 * **NOTE** Currently this function only checks if the password field is filled.
 * Arguements
 * - e - The array of elements from the form. It is used in the form e[#] for a specific index or e[''] for the specific name of an element.
 */
function validatePassword(e){
	if(!e['password'].value) {
		writeError(e['password'], '  This field is required.');
		return false;
	}
	return true;
}

/*
 * validateNewPassword - This function checks to validity of an input confirm_password field.
 * **NOTE** Currently this function only checks if the confirm_password field is filled, and if it matches the string entered into the new_password field.
 * Arguements
 * - e - The array of elements from the form. It is used in the form e[#] for a specific index or e[''] for the specific name of an element.
 */
function validateConfirmPassword(e){
	if(!e['confirm_password'].value) {
		writeError(e['confirm_password'], '  This field is required.');
		return false;
	}
	// Checks if the string in the confirm_password matches that of the password.
	else if(e['new_password'].value != e['confirm_password'].value) {
		writeError(e['confirm_password'], '  Your passwords do not match. Please type more carefully.');
		return false;
	}
	return true;
}

/**
 * checkMandatoryFields - checks the Title and Description field on the add issue page. 
 * NOTE: 	'new_issue' is the form name, 'title' and 'description' are the names of their respective fields in the HTML form.
 * 			All of these can are found in the addIssue.js. 
 */
function checkMandatoryFields()
{	
		var message = "Oops, you forgot to include the following mandatory fields:";
		if (document.new_issue.title.value == "" )
			message += "\nTitle";
		if (document.new_issue.description.value == "")
			message += "\nDescription"
		
		if (message != "Oops, you forgot to include the following mandatory fields:")
		{
			alert(message);
			return false;
		}
					
}


var fs = require('fs'), 
	http = require('http'),
	path = require('path'),
	url = require('url'),
	util = require('util'),
	contentTypes = require('./contentTypes');

/*
 * Router() 
 * 
 * The router takes a url and determines the appropriate 
 * function or resource to call/retrieve.
 */ 
var Router = exports.Router = function() { 
	this.simpleRoutes = []; 
	this.regexRoutes = []; 
};

/*
 * Adds a new route path to the router.
 * 
 * 'route': The route to add. 
 * 	The route can be a string or regular expression 
 * 'pathOrFunc': The path or function that should be returned 
 * 	when we see a specific route. 
 */ 
Router.prototype.add = function(route, pathOrFunc) {
	if (route instanceof RegExp) {
		var regexRoute = route.toString(); 
		regexRoute = regexRoute.substring(1, regexRoute.length - 1); 
		this.regexRoutes[regexRoute] = pathOrFunc; 
	}
	else {
		this.simpleRoutes[route] = pathOrFunc;
	}
};

/*
 * Given a path calls the appropriate function or resource. 
 * 
 * 'pathname': The path for a function or resource 
 * 'req': A Node 'http.serverRequest' object 
 * 'res': A Node 'http.serverResponse' object 
 */
Router.prototype.handle = function(pathname, req, res) {
	// Check extension to see if we can quickly serve a static resource 
	if (path.extname(pathname) != '') { 
		serveFile(pathname, res); 
	}
	else { // Need to determine which resource or function to call based on route 
		if (typeof this.simpleRoutes[pathname] == 'undefined') {
			// Look for a match in regex routes 
			for (r in this.regexRoutes) {
				var pattern = new RegExp(r); 
				if (pattern.test(pathname)) { 
					serve(this.regexRoutes[r], req, res);
					return; 
				}
			}
			// If we get here there is no match for a regex route
			// Try getting a static resource instead
			serveFile(pathname, res); 
		}
		else { // String route lookup 
			serve(this.simpleRoutes[pathname], req, res); 
		}
	}
};

/*
 * Services a request based on a known route.
 * 
 * Sends a HTTP 404 error if a resource is not found.  
 * Sends a HTTP 500 error if a called function throws an exception during execution.
 *
 * 'routeVal' The function to call or resource to retrieve 
 * 'req': A node 'http.serverRequest' object 
 * 'res': A node 'http.serverResponse' object 
 */
function serve(routeVal, req, res) {
	if (typeof routeVal == 'string') {
		serveFile(routeVal, res); 
	}
	else { // Call an action 
		var func = routeVal; 
		try {
			func(req, res);
		} 
		catch(e) {
			show500(res, e); 
		}
	}
}

/* 
 * Serves a static file. 
 * 
 * Sends a HTTP 404 error if a file cannot be found.  
 * 
 * 'pathname': The path of the file 
 * 'res': A Node 'http.serverResponse' object 
 */
function serveFile(pathname, res) {
	var filepath = path.join(process.cwd(), "public/" + pathname);
	path.exists(filepath, function(exists) {
		if (exists) {
			var mimeType = contentTypes.lookupMime(path.extname(filepath));
			res.writeHead(200, { 'Content-Type' : mimeType }); 
			util.pump(fs.createReadStream(filepath), res, function () {});
		}
		else {
			show404(res); 
		}
	}); 
}

/* 
 * If a route cannot be found for a request, 
 * this function can be called to send a HTTP 404 response. 
 * 
 * 'res': A Node 'http.serverResponse' object
 */
function show404(res) {
	res.writeHead(404, { 'Content-Type' : 'text/html' }); 
	res.end('<html><body><h1>404 Not Found</h1></body></html>');
}

/*
 * If a function call throws an exception,
 * this function can be called to send a HTTP 500 response. 
 *
 * 'res': A Node 'http.serverResponse' object 
 * 'e': The exception which caused the error 
 */ 
function show500(res, e) {
	res.writeHead(500, { 'Content-Type' : 'text/html' }); 
	res.end('<html><body><h1>500 Internal Server Error</h1><code>' + e.stack.replace(/\n/g, '<br>\n') + '</code></body></html>');
}

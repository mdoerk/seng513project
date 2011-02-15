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
	this.routes = []; 
	this.routePatterns = []; 
};

/*
 * Adds a new route path to the router.
 * 
 * 'routename': The route to add. 
 * 	The route can be a a string. 
 * 'pathOrFunc': The path or function that should be returned 
 * 	when we see a specific route. 
 */ 
Router.prototype.add = function(routename, pathOrFunc) {
	this.routes[routename] = pathOrFunc;
}; 

/*
 * Adds a new route path expression to the router
 *
 * 'routename': The route to add. 
 * 	The route can be a string representation of the regular expression.
 * 'pathOrFunc': The path or function that should be returned 
 * 	when we see a specific route.  
 */ 
Router.prototype.addRoutePattern = function(routename, pathOrFunc) {
	this.routePatterns[routename] = pathOrFunc; 
}

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
		serveResource(pathname, res); 
	}
	else { // Need to determine which resource or function to call based on route 
		if (typeof this.routes[pathname] == 'undefined') {
			// Check for a match in regular expression routes 
			for (r in this.routePatterns) {
				var patt = new RegExp(r); 
				if (patt.test(pathname)) { 
					serve(this.routePatterns[r], req, res);
					return; 
				}
			}
			// No match for regular expression route: 
			// see if we can serve static resource instead
			serveResource(pathname, res);
		}
		else { // String route lookup 
			serve(this.routes[pathname], req, res); 
		}
	}
};

/*
 * Services a request based on a known route.
 * 
 * Sends a HTTP 404 error if a resource is not found.  
 * Sends a HTTP 500 error if a called function throws an exception during execution.
 *
 * 'req': A node 'http.serverRequest' object 
 * 'res': A node 'http.serverResponse' object 
 */
function serve(routeVal, req, res) {
	if (typeof routeVal == 'string') {
		serveResource(routeVal, res); 
	}
	else {
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
 * Serves a static resource. 
 * 
 * Sends a HTTP 404 error if a resource cannot be found.  
 * 
 * 'pathname': The path of the resource 
 * 'res': A Node 'http.serverResponse' object 
 */
function serveResource(pathname, res) {
	var filepath = path.join(process.cwd(), pathname);
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
	res.end('<html><body><h1>500 Internal Server Error</h1></body></html>');
}
 




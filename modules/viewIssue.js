var sqlite = require('sqlite');
var url = require('url');

/* Database variable */
var db = new sqlite.Database();
db.open('database.db', function (error) {
    if (error) throw error;
});

var ViewIssue = exports.ViewIssue = function() {
};

/**
 * Send the HTML page to the client
 * @param response Response object to send the data
 */
function serve(response) {
    return function(error, rows) {
        var issue = rows[0];

        response.writeHead(200, 'text/html');
        response.write('<h1>' + issue['title'] + '</h1>');
        response.write('Created on ' + issue['creation_date'] + ' by ' + issue['user_id'] + '<br />');
        response.write('<h3>Description</h3>');
        response.write(issue['description'] + '<br />');
        response.write('More information: <a href="' + issue['link'] + '"> here </a>');
        response.end();

        db.close(function(error) {
            if (error) throw error;
        });
    };
}

/**
 * Main function of the module
 * @param request Incoming request
 * @param response Response object to send the data
 */
ViewIssue.display = function(request, response) {
    var parsedURL = url.parse(request.url, true);

    var sqlQuery = 'SELECT * FROM issues WHERE id=' + parsedURL.query.id;
    db.execute(sqlQuery, serve(response));
}

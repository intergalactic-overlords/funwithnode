/**
 * The http module will help us to send and receive http requests
 *
 * @url http://nodejs.org/api/http.html
 */
var http = require("http");

/**
 * Creating our server through the createServer method
 */
var server = http.createServer(function(request, response) {
  if (request.url === '/hello-world') {
    response.writeHead(200, {"Content-type":"text/plain"});
    response.write("Hello world!");
    response.end();
  } else {
    response.writeHead(404, {"Content-type":"text/plain"});
    response.write("404 - Page not found");
    response.end();
  }
});

/**
 * we need to declare a host and port and listen
 */

var host = "127.0.0.1"; // localhost
var port = 2014;

server.listen(port, host, function() {
  console.log('listening');
});

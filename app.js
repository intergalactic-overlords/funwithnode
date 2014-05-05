// require modules
var express = require('express');
var http = require('http');

// create our express app
var app = express();

// app configuration

// setting the port
app.set('port', process.env.PORT || 3000);


// setting routes:
// the method that we call is also the http method
// first pass the route (url),
// then determine what happens when visiting that url
// callback function has request and response object
// request is (off course) the request made to the server
// response is what happens
app.get("/hello-web", function (req, res) {
  res.send("Hello Web");
});

// homepage
app.get('/', function (req, res) {
  res.send('homepage');
});

// adding html
app.get("/about", function (req, res) {
  var message = [
    "<h1>About this site</h1>",
    "<p>I'll be creating a blog in nodejs and then I'll use that blog to blog about the creation of the blog.</p>",
    "<p>All very meta, I know ;-).",
    "<p>I want to learn nodejs for the following reasons:</p>",
    "<ul>",
    "<li>I want to get a better understanding of the web</li>",
    "<li>I want to get better at Javascript</li>",
    "<li>learning something new is fun</li>",
    "</ul>",
    "<p>&nbsp;</p>",
    "<p>Joachim</p>"].join('\n');
  res.send(message);
});

// createServer creates a default http server
// the app is passed to createServer, and sets it up
// pass a callback function to the app after the server has begun
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express listening on port " + app.get('port'));
});

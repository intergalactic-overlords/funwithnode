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
  // don't forget npm install jade
  res.render("about.jade");
});

// blogposts overview page
app.get(/\/articles/, function (req, res) {
  res.send('all articles');
});

// blogpost route
// \w => alphanumerical + underscore
// - => -
// + => multiple
// more on regex: http://eloquentjavascript.net/chapter10.html
app.get(/\/articles\/[\w-]+/, function (req, res) {
  res.send('this is an article');
});

// createServer creates a default http server
// the app is passed to createServer, and sets it up
// pass a callback function to the app after the server has begun
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express listening on port " + app.get('port'));
});

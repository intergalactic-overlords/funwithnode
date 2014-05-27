// require modules
var express = require('express');
var http = require('http');

// create our express app
var app = express();

// app configuration

// posts
var posts = [
  {
    "type": "article",
    "title": "Post 1",
    "path": "post-1",
    "teaser-text": "teaser-text",
    "body-text": "body-text",
    "tags": ["tag1", "tag2"],
    "date-created": "zo 25 mei 2014 15:19:09 CEST",
    "date-updated": "zo 25 mei 2014 15:19:09 CEST",
    "published": true
  },
  {
    "type": "article",
    "title": "Post unpublished",
    "path": "post-unpublished",
    "teaser-text": "teaser-text",
    "body-text": "body-text",
    "tags": ["tag1", "tag2"],
    "date-created": "zo 25 mei 2014 17:19:09 CEST",
    "date-updated": "zo 25 mei 2014 17:19:09 CEST",
    "published": false
  },
  {
    "type": "article",
    "title": "Post 2",
    "path": "post-2",
    "teaser-text": "teaser-text 2",
    "body-text": "body-text 2",
    "tags": ["tag1", "tag3"],
    "date-created": "zo 25 mei 2014 16:19:09 CEST",
    "date-updated": "ma 26 mei 2014 08:19:09 CEST",
    "published": true
  },
  {
    "type": "article",
    "title": "Post 3",
    "path": "post-3",
    "teaser-text": "teaser-text 3",
    "body-text": "body-text 3",
    "tags": ["tag1", "tag2", "tag3"],
    "date-created": "di 27 mei 2014 07:19:09 CEST",
    "date-updated": "di 27 mei 2014 07:19:09 CEST",
    "published": true
  }
]

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
app.get('/about', function (req, res) {
  // don't forget npm install jade
  res.render("about.jade");
});

// blogposts overview page
/*app.get('/articles', function (req, res) {
  res.send('all articles');
});*/

function loadPost (req, res, next) {
  posts.forEach(function(thisPost) {
    if (thisPost.path !== undefined && if (req.params.path === thisPost.path)) {
      req.post = thisPost;
    }
  });

  next();
}

// blogpost route
app.get('/articles/:path', loadPost, function (req, res) {
  res.json(req.post);
});

// createServer creates a default http server
// the app is passed to createServer, and sets it up
// pass a callback function to the app after the server has begun
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express listening on port " + app.get('port'));
});

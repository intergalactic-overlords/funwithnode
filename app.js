// require modules
var express = require('express');
var http = require('http');

// create our express app
var app = express();

// app configuration

function Article(type, title, path, author, teaserText, bodyText, tags, dateCreated, dateUpdated, published) {
  this.type = type;
  this.title = title;
  this.path = path;
  this.author = author;
  this.teaserText = teaserText;
  this.bodyText = bodyText;
  this.tags = tags;
  this.dateCreated = dateCreated;
  this.dateUpdated = dateUpdated;
  this.published = published;
}

// posts
var posts = [
  new Article (
    "article",
    "Post 1",
    "post-1",
    "me",
    "teaserText",
    "Nullam quis risus eget urna mollis ornare vel eu leo.",
    ["tag1", "tag2"],
    "zo 25 mei 2014 15:19:09 CEST",
    "zo 25 mei 2014 15:19:09 CEST",
    true
  ),
  new Article (
    "article",
    "Post unpublished",
    "post-unpublished",
    "you",
    "teaserText u",
    "Nulla vitae elit libero, a pharetra augue.",
    ["tag1", "tag2"],
    "zo 25 mei 2014 17:19:09 CEST",
    "zo 25 mei 2014 17:19:09 CEST",
    false
  ),
  new Article (
    "article",
    "Post 2",
    "post-2",
    "me",
    "teaserText 2",
    "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
    ["tag1", "tag3"],
    "zo 25 mei 2014 16:19:09 CEST",
    "ma 26 mei 2014 08:19:09 CEST",
    true
  ),
  new Article (
    "article",
    "Post 3",
    "post-3",
    "me",
    "teaserText 3",
    "Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
    ["tag1", "tag2", "tag3"],
    "di 27 mei 2014 07:19:09 CEST",
    "di 27 mei 2014 07:19:09 CEST",
    true
  )
];

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

function loadPosts (req, res, next) {
  var output = [];
  posts.forEach(function(thisPost) {
    if (thisPost.path !== undefined && thisPost.published) {
      output.push(thisPost);
    }
  });
  req.output = {};
  req.output.posts = output;

  next();
}

// blogposts overview page
app.get('/articles', loadPosts, function (req, res) {
  res.render("articles.jade", req.output);
});

function loadPost (req, res, next) {
  posts.forEach(function(thisPost) {
    if (thisPost.path !== undefined && (req.params.path === thisPost.path)) {
      req.post = thisPost;
      next();
    }
  });

  // default
  var err = new Error();
  err.status = 404;
  next(err);
}

// blogpost route
app.get('/articles/:path', loadPost, function (req, res) {
  if (req.post.type == 'article') {
    res.render("article.jade", req.post);
  }
});

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

// handling 404 errors
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }

  res.send(err.message || '** no unicorns here **');
});

// createServer creates a default http server
// the app is passed to createServer, and sets it up
// pass a callback function to the app after the server has begun
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express listening on port " + app.get('port'));
});

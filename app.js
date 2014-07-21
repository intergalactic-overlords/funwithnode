// require modules
var express = require('express');
var path = require('path');
var http = require('http');

var routes = require('./routes/index');
var articles = require('./routes/articles');

// create our express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setting the port
app.set('port', process.env.PORT || 3000);

// article object
function Article(title, path, author, teaserText, bodyText, tags, dateCreated, dateUpdated, published) {
  this.type = "article";
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


// database tutorial: http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/



// routes
app.use('/', routes);
app.use('/', articles);

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

app.get('/about', function (req, res) {
  res.render("about.jade");
});

/*function loadArticles (req, res, next) {
  var articles = [];
  posts.forEach(function(thisPost) {
    if (thisPost.type == 'article' && thisPost.path !== undefined && thisPost.published) {
      articles.push(thisPost);
    }
  });
  req.output = {};
  req.output.articles = articles;

  next();
}

// blogposts overview page
app.get('/articles', loadArticles, function (req, res) {
  res.render("articles.jade", req.output);
});*/

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

  res.send(err.message || '** nothing to see, move along **');
});

// createServer creates a default http server
// the app is passed to createServer, and sets it up
// pass a callback function to the app after the server has begun
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express listening on port " + app.get('port'));
});

/*
db.content.insert({
type: "article",
title:"Post 1",
path:"post-1",
author:"me",
teaserText:"teaserText",
bodyText:"Nullam quis risus eget urna mollis ornare vel eu leo.",
tags:["tag1", "tag2"],
dateCreated:"zo 25 mei 2014 15:19:09 CEST",
dateUpdated:"zo 25 mei 2014 15:19:09 CEST",
published:true
},
{
type: "article",
title:"Post unpublished",
path:"post-unpublished",
author:"you",
teaserText:"teaserText u",
bodyText:"Nulla vitae elit libero, a pharetra augue.",
tags:["tag1", "tag2"],
dateCreated:"zo 25 mei 2014 17:19:09 CEST",
dateUpdated:"zo 25 mei 2014 17:19:09 CEST",
published:false
},
{
type: "article",
title:"Post 2",
path:"post-2",
author:"me",
teaserText:"teaserText 2",
bodyText:"Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
tags:["tag1", "tag3"],
dateCreated:"zo 25 mei 2014 16:19:09 CEST",
dateUpdated:"ma 26 mei 2014 08:19:09 CEST",
published:true
},
{
type: "article",
  title:"Post 3",
  path:"post-3",
  author:"me",
  teaserText:"teaserText 3",
  bodyText:"Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
  tags:["tag1", "tag2", "tag3"],
  dateCreated:"di 27 mei 2014 07:19:09 CEST",
  dateUpdated:"di 27 mei 2014 07:19:09 CEST",
  published:true});*/

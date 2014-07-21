var express = require('express');
var router = express.Router();

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

var posts = [
  new Article (
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

function loadArticles (req, res, next) {
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

function loadArticle (req, res, next) {
  posts.forEach(function(thisPost) {
    if (thisPost.type == 'article' && thisPost.path !== undefined && req.params.path === thisPost.path) {
      req.article = thisPost;
      next();
    }
  });

  // default
  var err = new Error();
  err.status = 404;
  next(err);
}

/* GET articles overview page. */
router.get('/articles', loadArticles, function(req, res) {
  res.render("articles.jade", req.output);
});

// blogpost route
router.get('/articles/:path', loadArticle, function (req, res) {
  res.render("article.jade", req.article);
});

module.exports = router;

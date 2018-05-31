var wasimExpress = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  expressSanitizer = require("express-sanitizer");
  methodOverride = require('method-override'),
  app = wasimExpress();
  var Blog = require("./models/blog");
app.set("view engine", "ejs");
app.use(wasimExpress.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  "extended": true
}));
app.use(expressSanitizer()); // must use after bodyParser use, and before routes
app.use(methodOverride('_method'));

//database connection
mongoose.connect("mongodb://localhost/blogApp");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Database connected!");

  

  app.get("/", function (req, res) {
    res.redirect("/blogs");
  });

  //Restful Index route
  app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, foundBlog) {
      if (err) {
        console.log(err);
      } else {
        res.render("index", {
          blog: foundBlog
        });
      }

    }); // index route end

  });

  // Restful New route
  app.get("/blogs/new", function (req, res) {
    res.render("new");
  }); // new route end

  // Restful create route
  app.post("/blogs", function (req, res) {
    console.log(req.body.post.description);
    req.body.post.description = req.sanitize(req.body.post.description);
    console.log("=============");
    console.log(req.body.post.description);
    Blog.create(req.body.post, function (err, createdPost) {
      if (err) {
        console.log(err);
      } else {
        console.log(createdPost);
        res.redirect("/blogs");
      }

    }); //blog-create end

  }); // Create route end
  // Restful show route
  app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundPost) {
      if (err) {
        console.log(err);
      } else {
        res.render("show", {
          "post": foundPost
        });
      }

    }); // blog find ends

  }); //End show route


  //Restful edit route
  app.get("/blogs/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, postFound) {
      if (err) {
        console.log(err);
      } else {
        res.render("edit", {
          post: postFound
        });
      }
    }); // end blog find
  }); // end edit route

  //Restful update route
  app.put("/blogs/:id", function (req, res) {
    req.body.post.description = req.sanitize(req.body.post.description);
    Blog.findByIdAndUpdate(req.params.id, req.body.post, function (err, postUpdated) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/blogs/" + req.params.id);
      }
    }); // end find by id and update
  }); // end update route

  // Restful delete route
  app.delete("/blogs/:id", function(req, res){
    
    // find by id and remove
    Blog.findByIdAndRemove(req.params.id, function(err){
      if(err) {
        res.redirect("/blogs");
      }
      else {
        res.redirect("/blogs");
      }
    }); // end find by id and remove
  }); // end delete route

}); //database

app.listen(3000, function () {
  console.log("Server is started");
});
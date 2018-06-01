var Blog = require("../models/blog");
var wasimExpress = require("express");
var middleware = require("../middleware/mid");
var router = wasimExpress.Router();

//Restful Index route
router.get("/blogs", function (req, res) {
  Blog.find({}, function (err, foundBlog) {
    if (err) {
      console.log(err);
    } else {
      res.render("blog/index", {
        blog: foundBlog
      });
    }

  });  // Blog.find ends


}); // index route end




// Restful New route
router.get("/blogs/new", function (req, res) {
  res.render("blog/new");
}); // new route end




// Restful create route
router.post("/blogs", function (req, res) {
  req.body.post.description = req.sanitize(req.body.post.description);

  Blog.create(req.body.post, function (err, createdPost) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blogs");
    }

  }); //blog-create end

}); // Create route end



// Restful show route
router.get("/blogs/:id", middleware.isLoggedIn, function (req, res) {
  Blog.findById(req.params.id, function (err, foundPost) {
    if (err) {
      console.log(err);
    } else {
      res.render("blog/show", {
        "post": foundPost
      });
    }

  }); // blog find ends

}); //End show route




//Restful edit route
router.get("/blogs/:id/edit", function (req, res) {
  Blog.findById(req.params.id, function (err, postFound) {
    if (err) {
      console.log(err);
    } else {
      res.render("blog/edit", {
        post: postFound
      });
    }
  }); // end blog find
}); // end edit route




//Restful update route
router.put("/blogs/:id", function (req, res) {
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
router.delete("/blogs/:id", function(req, res){
  
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



module.exports = router;





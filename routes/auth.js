var wasimExpress = require("express");
var User = require("../models/user");
var passport = require("passport");
var router = wasimExpress.Router();

// Register route GET
router.get("/register", function(req, res){
  res.render("register/register");
});



// Register POST
router.post("/register", function(req, res){
  User.register(new User({"name": req.body.name, "username": req.body.username}), req.body.password, function(err){
    if(err){
      console.log(err);
      return res.redirect("/register");
    }
    else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/blogs");
      });
    }
  });
});





// Log in route GET
router.get("/login", function(req, res){
  res.render("register/login");
});



// Login POST
router.post("/login", passport.authenticate("local", {
  "successRedirect": "/blogs",
  "failureRedirect": "/login"
}), function(req, res){
});

router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/blogs");
});


module.exports = router;
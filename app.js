var wasimExpress = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  expressSanitizer = require("express-sanitizer");
  methodOverride = require('method-override'),
  User =             require("./models/user"),
  app = wasimExpress();
  var passport = require("passport");
  var localStrategy = require("passport-local");
  var passportLocalMongoose = require("passport-local-mongoose");
  var Blog = require("./models/blog");
  var blogRoutes = require("./routes/blog");
app.set("view engine", "ejs");
app.use(wasimExpress.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  "extended": true
}));
app.use(require("express-session")({
  "secret": "Saifu",
  "resave": false,
  "saveUninitialized": false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(expressSanitizer()); // must use after bodyParser use, and before routes
app.use(methodOverride('_method'));

app.use(blogRoutes);

//database connection blogy
mongoose.connect("mongodb://localhost/blogApp");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Database connected!");

  

  app.get("/", function (req, res) {
    res.redirect("/blogs");
  });

  


  // Register route GET
  app.get("/register", function(req, res){
    res.render("register/register");
  });



  // Register POST
  app.post("/register", function(req, res){
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
  app.get("/login", function(req, res){
    res.render("register/login");
  });

  

  // Login POST
  app.post("/login", passport.authenticate("local", {
    "successRedirect": "/blogs",
    "failureRedirect": "/login"
  }), function(req, res){
  });



  //middleware
  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  }


}); //database

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is started");
});
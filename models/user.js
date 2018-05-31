var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose"); 

const userSchema = new mongoose.Schema({
  "name": String,
  "username": String,
  "password": String,
  "created": {"type": Date, "default": Date.now}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
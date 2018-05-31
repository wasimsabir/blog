const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  "name": String,
  "username": String,
  "password": String,
  "created": {"type": Date, "default": Date.now}
});

module.exports = mongoose.model("User", userSchema);
var mongoose = require("mongoose");
//blog schema
var blogSchema = new mongoose.Schema({
  "title": String,
  "image": String,
  "description": String,
  "created": {
    "type": Date,
    "default": Date.now
  }
});

//blog model
module.exports = mongoose.model("Blog", blogSchema);
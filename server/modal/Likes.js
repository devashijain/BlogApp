var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  BlogTitle : String,
  Username : String,
  Like : Boolean
});

var Likes = module.exports = mongoose.model('Like', blogSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  Username : String,
  Title : String,
  Images : String,
  Caption : String,
  Description : String,
  Timing : Date,
  Likes : Number
});

module.exports = mongoose.model('Blog', blogSchema);

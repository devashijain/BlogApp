var Reflux = require('reflux');

var actionComponent = Reflux.createActions([
  "handleRegistrationForm",
  "handleLoginAuth",
  "logOut",
  "addBlogToDB",
  "fetchAllBlogsFromDB",
  "likedBlog"
]);

module.exports = actionComponent;

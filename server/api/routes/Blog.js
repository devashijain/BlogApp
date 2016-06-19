var express = require('express');
var router = express.Router();
var Blogs = require('../../modal/Blogs');



router.get('/fetchBlog',function(request,respond){
  Blogs.find({})
  .exec(function(err,blogs){
    if(err){
      respond.send("error has occured");
    }
    else {
      respond.json(blogs);
    }
  });
});

router.post('/setLike',function(request,respond){
  Blogs.find({})
  .exec(function(err,likedBlogs){
    if(err){
      respond.send("error has occured");
    }else{
      console.log(likedBlogs);
    }
  })
});


// router.post('/getMovieDetails', function(req,res){
//      imdbObj(req.param('movie'), function (err, data) {
//        res.send(data);
//      });
//    });
// Search and save the movie
  router.post('/addBlog', function(req, res) {
    console.log("in side server Blog");
    var blog = new Blogs();

     blog.Username = req.body.username;
     blog.Title = req.body.blogName;
     blog.Images = req.body.image;
     blog.Caption = req.body.captions;
     blog.Description = req.body.descriptions;
     blog.Timing = req.body.DateNtime;
     blog.Likes = req.body.Likes;
     blog.save(function(err) {
         if (err)
             res.send(err);
        console.log(blog);
         res.json({ message: 'Blog added!' });
           });
        });

// Route to get all movies and save a movie
// router.route('/')
// // Get all movies
//     .get(function(req, res){
//       Movie.find(function(err, movies) {
//             if (err)
//                 res.send(err);
//             res.json(movies);
//         });
//     })
// // Search and save the movie
//   .post(function(req, res) {
//     console.log("inside   "+req.body.name);
//         imdbObj(req.body.name, function (err, data) {
//         if (data){
//         var movie = new Movie();
//         movie.Title = data.Title;
//         movie.Year =  data.Year;
//         movie.Rated = data.Rated;
//         movie.Released = data.Released;
//         movie.Runtime = data.Runtime;
//         movie.Genre = data.Genre;
//         movie.Director = data.Director;
//         movie.Writer = data.Writer;
//         movie.Actors = data.Actors;
//         movie.Plot = data.Plot;
//         movie.Language = data.Language;
//         movie.Country = data.Country;
//         movie.Awards = data.Awards;
//         movie.Poster = data.Poster;
//         movie.Metascore = data.Metascore;
//         movie.imdbRating = data.imdbRating;
//         movie.imdbVotes = data.imdbVotes;
//         movie.imdbID = data.imdbID;
//         movie.Type = data.Type;
//         movie.Response = data.Response;
//         movie.save(function(err) {
//             if (err)
//                 res.send(err);
//             res.json({ message: 'Movie added!' });
//               });
//             }else {
//               res.send(err);
//             }
//             });
//         });
// // Route to get all movies and save a movie
//     router.route('/movies/:movie_id')
// // Get the movie by id
//           .get(function(req, res) {
//             Movie.findById(req.params.movie_id, function(err, movie) {
//                 if (err)
//                     res.send(err);
//                 res.json(movie);
//             });
//         })
// // Update the movie by id
//         .put(function(req, res) {
//         Movie.findById(req.params.movie_id, function(err, movie) {
//             if (err)
//                 res.send(err);
//             movie.Title = 'Hello';
//             movie.save(function(err) {
//                 if (err)
//                     res.send(err);
//                 res.json({ message: 'Movie updated!' });
//             });
//         });
//     })
// // Delete the movie by id
//     .delete(function(req, res) {
//         Movie.remove({
//             _id: req.params.movie_id
//         }, function(err, movie) {
//             if (err)
//                 res.send(err);
//             res.json({ message: 'Successfully deleted' });
//         });
//     });

module.exports= router;

var express = require('express');
var router = express.Router();

var imdbObj = require('node-movie');
var Movie = require('../../modal/movie');


router.post('/addDB',function(request,respond){
  console.log(request.body.Name);
imdbObj(request.body.Name, function (err, data) {
  if(data){
    var movie=new Movie();
            movie.Title = data.Title;
            movie.Year =  data.Year;
            movie.Rated = data.Rated;
            movie.Released = data.Released;
            movie.Runtime = data.Runtime;
            movie.Genre = data.Genre;
            movie.Director = data.Director;
            movie.Writer = data.Writer;
            movie.Actors = data.Actors;
            movie.Plot = data.Plot;
            movie.Language = data.Language;
            movie.Country = data.Country;
            movie.Awards = data.Awards;
            movie.Poster = data.Poster;
            movie.Metascore = data.Metascore;
            movie.imdbRating = data.imdbRating;
            movie.imdbVotes = data.imdbVotes;
            movie.imdbID = data.imdbID;
            movie.Type = data.Type;
            movie.Response = data.Response;
      movie.save(function(err){
        if(err){
          res.send(err)
        }
        respond.json('Movie added');
      });
    }
  })
});


router.post('/',function(request, respond) {
console.log(request.body.movieName);
  imdbObj(request.body.movieName, function (err, data) {

    if (data){
            respond.json(data);
          }else {
            respond.send(err);
          }
          });
      });

module.exports= router;

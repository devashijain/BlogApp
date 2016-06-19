var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var routes = require('./api/routes/index');
var users = require('./api/routes/users');
var User = require('./modal/user');
var send = require('./api/routes/Blog');
var likePage = require('./api/routes/like');
var dBconfig = require('./config/config.json');
var config = require('./config/main.js');
var app = express();


mongoose.connect(dBconfig.Config);

var db = mongoose.connection;

// view engine setup
// app.set('views',path.join(__dirname,'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine','html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Body Parser Middleware to get POST request API Use
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Log request to console


// Initialize passport for use
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);

// Home route. We'll end up changing this to our main front end index later.
// app.get('/', function(req, res) {
//   res.send('Relax. We will put the home page here later.');
// });


//Set Static Folder
app.use(express.static(path.join(__dirname, '../client/dist')));

//Express sesion
app.use(session({
  secret : 'secret',
  saveUninitialized : true,
  resave : true
}));

//Passport Innit
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
  errorFormatter : function(param, msg , value){
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return{
      param: formParam,
      msg : msg,
      value : value
    };
  }
}));

//Connect flash
app.use(flash());


//Global Vars
app.use(function (req,res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use('/', routes);
app.use('/Blog',send);
app.use('/Like',likePage);
app.use('/users', users);


module.exports = app;

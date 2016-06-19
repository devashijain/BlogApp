var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../config/main.js');

var User = require('../../modal/user');

var response = {};

// Register
router.get('/register', function(req, res){
	res.render('register');
});


router.post('/login',function(req,res) {
   console.log('post route on /api/users/login invoked.');
   User.getUserByUsername(req.body.username, function(err,user) {
     if(err) {
         response = {
           statusCode : 500,
           message : 'Fetching user failed',
           error : err
         };

         res.json(response);
     }
     else if(!user) {
       response = {
         statusCode : 400,
         message : 'Login failed. User not found.',
         error : 'USER-DOES-NOT-EXIST'
       };

       res.send(response);
     } else {
       User.comparePassword(req.body.password, user.password, function(err, isMatch) {
         if(isMatch && !err) {
           var token = jwt.sign(user, config.secret, {
             expiresIn : 86400 //in seconds
           });
           response = {
             statusCode : 200,
             message : 'Authentication successful',
             user : user.username,
             token : 'JWT ' + token
           };
         } else {
           response = {
             statusCode : 400,
             message : 'Authentication failed. Password does not match.',
             error : 'AUTH-FAIL'
           };
         }

         res.json(response);
       });
     }
   });
 });

router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	//Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty(); //empty
	req.checkBody('email', 'Email is not valid').isEmail(); //valid
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
	res.render('register',{
		errors:errors
	});
	}else{
		var newUser = new User({
				name: name,
				email:email,
				username: username,
				password: password
			});

			User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);

       res.send(user);
		});

	//	req.flash('success_msg', 'You are registered and can now login');


	}
});


module.exports = router;

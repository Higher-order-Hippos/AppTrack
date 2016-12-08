const User = require('./userModel.js');
// this file posts is not currently used

module.exports = {
	signUp: function(req, res) {
	  var username = req.body.data.username;
	  var password = req.body.data.password;

	  User.find({ username: username },
	    function(err, user) {
	      if (!user) {
	        var newUser = new User({
	          username: username,
	          password: password
	        });

	        newUser.save(function(err, newUser) {
	          if (err) {
	            res.status(500).send(err);
	          }
	          createSession(req, res, newUser);
	        });
	      } else {
	        console.log('Account already exists');
	      }
	    });
	},


  signIn: function(req, res) {
		User.find({ username: req.body.data.username },
		  function(err, user) {
	      if (!user) {
		  		console.log('User not found! Have you signed up yet?');
		  	}

		  	if (user) {
		  		if (req.body.data.password === user.password) {
		  			createSession(req, res, user);
		  		} else {
		  			console.log('Authentication failed.')
		  		}
		  	}

		  	if (err) {
		  		console.log(err);
		  	}
		  })
	},

  createSession: function(req, res, newUser) {
	  return req.session.regenerate(function() {
	      req.session.user = newUser;
	      res.redirect('/');
	    });
	}
}

var express = require('express');
var passport = require('passport');
var accountRegisterService = require('../application/accountRegisterService');
var router = express.Router();

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
	
	this.registerError = function (message) {
		res.render("register", {message: message});
	};

	this.registerSuccess = function () {
		passport.authenticate('local')(req, res, function () {
	            res.redirect('/');
	    });
	};
	
	var credentials = {
		username: req.body.username,
		password1: req.body.password,
		password2: req.body.password2
	};

	accountRegisterService.register(credentials, registerSuccess.bind(this), registerError.bind(this));
});

module.exports = router;
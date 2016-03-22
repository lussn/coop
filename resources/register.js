var express = require('express');
var passport = require('passport');
var AccountRegisterService = require('../application/AccountRegisterService');
var router = express.Router();

router.get('/register', function (req, res) {
  res.render('register', {});
});

router.post('/register', function (req, res) {
  this.registerError = function (message) {
    res.render("register", {message: message});
  };

  this.registerSuccess = function () {
    passport.authenticate('local')(req, res, function () {
      res.redirect('/dashboard');
    });
  };

  var credentials = {
    username: req.body.username,
    email: req.body.email,
    password1: req.body.password,
    password2: req.body.password2
  };

  AccountRegisterService.register(credentials, registerSuccess.bind(this), registerError.bind(this));
});

module.exports = router;

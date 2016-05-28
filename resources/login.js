var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.render('login', {info: 'Invalid username or password. Try again.'}); }
      req.login(user, function(err) {
      	if (err) { return next(err); }
      	return res.redirect('/');
      });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

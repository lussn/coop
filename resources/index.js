var express = require('express');
var auth = require('./validator/AuthValidator');
var router = express.Router();

router.get('/', auth.validateUser, function (req, res) {
  res.render('index', { user : req.user });
});

module.exports = router;

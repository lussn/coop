var express = require('express');
var auth = require('./validator/AuthValidator');
var router = express.Router();

router.get('/dashboard', auth.validateUser, function (req, res) {
    res.render('dashboard', { user : req.user });
});

module.exports = router;
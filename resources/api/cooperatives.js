var express = require('express');
var auth = require('./../validator/AuthValidator');
//var AccountRegisterService = require('../application/AccountRegisterService');
var router = express.Router();

router.get('/api/cooperatives', auth.validateApiUser, function(req, res) {
    res.json({cooperatives: 'hola'});
});

module.exports = router;

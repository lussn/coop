var express = require('express');
var auth = require('./../validator/AuthValidator');
var CooperativeAddService = require('../../application/CooperativeAddService');
var CooperativesReaderService = require('../../application/CooperativesReaderService');
var router = express.Router();

router.get('/api/cooperatives', auth.validateApiUser, function(req, res) {
	var callback = function(cooperatives) {
		res.json(cooperatives);
	};
	CooperativesReaderService.findAll(req.user._id, callback.bind(this));
});

router.post('/api/cooperatives', auth.validateApiUser, function(req, res) {
	try {
    	CooperativeAddService.save(req.body, req.user._id);
    	res.status(200);
	} catch (err) {
		res.status(400);
	}
});

module.exports = router;

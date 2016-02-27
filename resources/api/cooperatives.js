var express = require('express');
var auth = require('./../validator/AuthValidator');
var CooperativeRegisterService = require('../../application/CooperativeRegisterService');
var CooperativesReaderService = require('../../application/CooperativesReaderService');
var router = express.Router();

router.get('/api/cooperatives', auth.validateApiUser, function (req, res) {
    var callback = function (cooperatives) {
        res.json(cooperatives);
    };
    CooperativesReaderService.findAll(req.user._id, callback.bind(this));
});

router.get('/api/cooperatives/:cooperative_id', auth.validateApiUser, function (req, res) {
    var callback = function (cooperatives) {
        res.json(cooperatives);
    };
    CooperativesReaderService.findById(req.user._id, req.params.cooperative_id, callback.bind(this));
});

router.post('/api/cooperatives', auth.validateApiUser, function (req, res) {
    try {
        CooperativeRegisterService.save(req.body, req.user._id);
        res.status(200).send();
    } catch (err) {
        res.status(400).send();
    }
});

router.put('/api/cooperatives/:cooperative_id', auth.validateApiUser, function (req, res) {
    try {
        CooperativeRegisterService.update(req.body, req.params.cooperative_id, function () {
            res.status(200).send();
        }.bind(this));
    } catch (err) {
        res.status(400).send();
    }
});

router.delete('/api/cooperatives/:cooperative_id', auth.validateApiUser, function (req, res) {
    try {
        CooperativeRegisterService.delete(req.params.cooperative_id);
        res.status(200).send();
    } catch (err) {
        res.status(400).send();
    }
});

module.exports = router;

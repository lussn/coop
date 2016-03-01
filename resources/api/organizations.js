var express = require('express');
var auth = require('./../validator/AuthValidator');
var OrganizationRegisterService = require('../../application/OrganizationRegisterService');
var OrganizationsReaderService = require('../../application/OrganizationsReaderService');
var router = express.Router();

router.get('/api/organizations', auth.validateApiUser, function (req, res) {
    var callback = function (organizations) {
        res.json(organizations);
    };
    OrganizationsReaderService.findAll(req.user._id, callback.bind(this));
});

router.get('/api/organizations/:organization_id', auth.validateApiUser, function (req, res) {
    var callback = function (organizations) {
        res.json(organizations);
    };
    OrganizationsReaderService.findById(req.user._id, req.params.organization_id, callback.bind(this));
});

router.post('/api/organizations', auth.validateApiUser, function (req, res) {
    try {
        OrganizationRegisterService.save(req.body, req.user._id);
        res.status(200).send();
    } catch (err) {
        res.status(400).send();
    }
});

router.put('/api/organizations/:organization_id', auth.validateApiUser, function (req, res) {
    try {
        OrganizationRegisterService.update(req.body, req.params.organization_id, function () {
            res.status(200).send();
        }.bind(this));
    } catch (err) {
        res.status(400).send();
    }
});

router.delete('/api/organizations/:organization_id', auth.validateApiUser, function (req, res) {
    try {
        OrganizationRegisterService.delete(req.params.organization_id);
        res.status(200).send();
    } catch (err) {
        res.status(400).send();
    }
});

module.exports = router;

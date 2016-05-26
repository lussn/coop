var express = require('express');
var auth = require('./../validator/AuthValidator');
var OrganizationRegisterService = require('../../application/OrganizationRegisterService');
var OrganizationsReaderService = require('../../application/OrganizationsReaderService');
var router = express.Router();

var _callbackReturnsResponse = function (response) {
  this.json(response);
};

var _callbackReturnsSuccess = function () {
  this.status(200).send();
};

router.get('/api/organizations', auth.validateApiUser, function (req, res) {
  OrganizationsReaderService.findAll(req.user._id, _callbackReturnsResponse.bind(res));
});

router.get('/api/organizations/:organization_id', auth.validateApiUser, function (req, res) {
  OrganizationsReaderService.findById(req.user._id, req.params.organization_id, _callbackReturnsResponse.bind(res));
});

router.post('/api/organizations', auth.validateApiUser, function (req, res) {
  try {
    OrganizationRegisterService.save(req.body, req.user._id, _callbackReturnsResponse.bind(res));
  } catch (err) {
      res.status(400).send();
  }
});

router.post('/api/organizations/:organization_id/accounts', auth.validateApiUser, function (req, res) {
  try {
    OrganizationRegisterService.saveAccount(
      req.body,
      req.params.organization_id,
      req.user._id,
      _callbackReturnsResponse.bind(res)
    );
  } catch (err) {
      res.status(400).send();
  }
});

router.put('/api/organizations/:organization_id', auth.validateApiUser, function (req, res) {
  try {
    OrganizationRegisterService.update(req.body, req.params.organization_id, _callbackReturnsResponse.bind(res));
  } catch (err) {
    res.status(400).send();
  }
});

router.put('/api/organizations/:organization_id/accounts/:account_id', auth.validateApiUser, function (req, res) {
  try {
    OrganizationRegisterService.updateAccountFromOrganization(
      req.body,
      req.params.organization_id,
      req.user._id,
      _callbackReturnsResponse.bind(res)
    );
  } catch (err) {
    res.status(400).send();
  }
});

router.delete('/api/organizations/:organization_id', auth.validateApiUser, function (req, res) {
  try {
    OrganizationRegisterService.delete(req.params.organization_id, _callbackReturnsSuccess.bind(res));
  } catch (err) {
    res.status(400).send();
  }
});

router.delete('/api/organizations/:organization_id/accounts/:account_id', auth.validateApiUser, function (req, res) {
  try {
    OrganizationRegisterService.deleteAccountFromOrganization(
      req.params.account_id,
      req.params.organization_id,
      req.user._id,
      _callbackReturnsSuccess.bind(res)
    );
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = router;

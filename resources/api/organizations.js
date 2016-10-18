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

var _returnsError = function (error) {
  this.status(400).send(error);
};

router.get('/organizations', auth.validateApiUser, function (req, res) {
    OrganizationsReaderService.findAll(req.user._id)
      .then(_callbackReturnsResponse.bind(res), _returnsError.bind(res))
    ;
});

router.get('/organizations/:organization_id', auth.validateApiUser, function (req, res) {
    OrganizationsReaderService.findById(req.user._id, req.params.organization_id)
      .then(_callbackReturnsResponse.bind(res), _returnsError.bind(res))
    ;
});

router.post('/organizations', auth.validateApiUser, function (req, res) {
    OrganizationRegisterService.save(req.body, req.user._id)
      .then(_callbackReturnsResponse.bind(res), _returnsError.bind(res));
});

router.post('/organizations/:organization_id/accounts', auth.validateApiUser, function (req, res) {
  OrganizationRegisterService.saveAccount(
    req.body,
    req.params.organization_id,
    req.user._id
  ).then(_callbackReturnsResponse.bind(res), _returnsError.bind(res));
});

router.post('/organizations/:organization_id/product', auth.validateApiUser, function (req, res) {
  OrganizationRegisterService.saveProduct(
    req.body,
    req.params.organization_id,
    req.user._id
  ).then(_callbackReturnsResponse.bind(res), _returnsError.bind(res));
});

router.put('/organizations/:organization_id', auth.validateApiUser, function (req, res) {
  OrganizationRegisterService.update(req.body, req.params.organization_id)
    .then(_callbackReturnsResponse.bind(res), _returnsError.bind(res));
});

router.put('/organizations/:organization_id/accounts/:account_id', auth.validateApiUser, function (req, res) {
    OrganizationRegisterService.updateAccountFromOrganization(
      req.body,
      req.params.organization_id,
      req.user._id
    ).then(_callbackReturnsResponse.bind(res), _returnsError.bind(res));
});

router.delete('/organizations/:organization_id', auth.validateApiUser, function (req, res) {
    OrganizationRegisterService.delete(req.params.organization_id)
      .then(_callbackReturnsSuccess.bind(res), _returnsError.bind(res));
});

router.delete('/organizations/:organization_id/accounts/:account_id', auth.validateApiUser, function (req, res) {
    OrganizationRegisterService.deleteAccountFromOrganization(
      req.params.account_id,
      req.params.organization_id,
      req.user._id
    ).then(_callbackReturnsSuccess.bind(res), _returnsError.bind(res));
});

module.exports = router;

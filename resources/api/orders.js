var express = require('express');
var auth = require('./../validator/AuthValidator');
var OrderRegisterService = require('../../application/OrderRegisterService');
var router = express.Router();

var _callbackReturnsResponse = function (response) {
  this.json(response);
};

var _returnsError = function (error) {
  this.status(400).send(error);
};

router.get('/orders', auth.validateApiUser, function (req, res) {
    /*OrdersReaderService.findAll(req.user._id)
      .then(_callbackReturnsResponse.bind(res), _returnsError.bind(res))
    ;*/
});

router.post('/orders', auth.validateApiUser, function (req, res) {
    OrderRegisterService.saveWithOneProduct(req.body, req.user._id)
      .then(_callbackReturnsResponse.bind(res), _returnsError.bind(res));
});

router.put('/orders/:order_id', auth.validateApiUser, function (req, res) {
    OrderRegisterService.toggleActive(req.params.order_id)
      .then(_callbackReturnsResponse.bind(res), _returnsError.bind(res));
});

module.exports = router;

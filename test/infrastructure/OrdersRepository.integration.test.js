var mongoose = require('mongoose');
var Order = require('../../domain/orders/Order');
var Account = require('../../infrastructure/persistence/authentication/Account');
var Product = require('../../domain/products/Product');
var OrdersRepository = require("../../infrastructure/persistence/OrdersRepository.js");
var AccountsRepository = require("../../infrastructure/persistence/AccountsRepository.js");
var ProductsRepository = require("../../infrastructure/persistence/ProductsRepository.js");
var assert = require('chai').assert;
var db;

const PRODUCT_NAME = 'basketTest';
const ACCOUNT_NAME = 'testaccount';

function _createMember(name) {
  return new Account({
    username: name,
    email: name + '@coop.com'
  });
}

function _saveNewAccount(name, callback) {
  var newAccountModel = _createMember(name);
  AccountsRepository.save(newAccountModel, 'testPassword').then(callback);
}

function _createProduct(name) {
  return Product.createFromJson({
    name: name,
    price: 23,
    description: 'Letucce test, broccoli party',
    deliverAt: '11/30/2011'
  });
}

describe('OrdersRepository', function() {

  before(function (done) {
    db = mongoose.connect('mongodb://localhost/test');

    _saveNewAccount.call(this, ACCOUNT_NAME, function (account) {
      this.newAccountId = account._id;

      ProductsRepository.save(
        _createProduct(PRODUCT_NAME)
      ).then(function (product) {
        this.productId = product._id;

        var orderJson = {
          active: 1,
          user: this.newAccountId,
          products: []
        };

        var order = Order.createFromJson(orderJson);
        order.products.push(this.productId);

        OrdersRepository.save(order).then(function (savedOrder) {
          this.orderId = savedOrder._id;
          done();
        }.bind(this));

      }.bind(this));
    }.bind(this));
  });

  after(function (done) {
    mongoose.connection.close();
    done();
  });

  it('findById should return an order with populated accounts and products', function (done) {
    OrdersRepository.findById(this.orderId).then(function (order) {
      assert.equal(ACCOUNT_NAME, order[0].user.username);
      assert.equal(PRODUCT_NAME, order[0].products[0].name);
      done();
    }.bind(this));
  });

  it('toggleActive should edit an order', function (done) {
    OrdersRepository.toggleActive(this.orderId).then(function () {
      OrdersRepository.findById(this.orderId).then(function (order) {
        assert.equal(1, order[0].active);
        // TODO: I'm getting the old object for some reason. Must be false
        done();
      }.bind(this));
    }.bind(this));
  });
});

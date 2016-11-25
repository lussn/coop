var mongoose = require('mongoose');
var Account = require('../../infrastructure/persistence/authentication/Account.js');
var Order = require('../../domain/orders/Order');
var Product = require('../../domain/products/Product');
var AccountsRepository = require('../../infrastructure/persistence/AccountsRepository.js');
var OrdersRepository = require('../../infrastructure/persistence/OrdersRepository.js');
var ProductsRepository = require('../../infrastructure/persistence/ProductsRepository.js');
var assert = require('chai').assert;
var db;

const NEW_USERNAME = 'testUsername';

function assertAccountHasNewUsername(accounts) {
  assert.equal(NEW_USERNAME, accounts.username);
}

function assertAccountHasNewOrder(accounts) {
  assert.equal(1, accounts.orders.length);
}

describe('AccountsRepository', function() {

  before(function (done) {
    db = mongoose.connect('mongodb://localhost/test');
    done();
  });

  after(function (done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function (done) {
    var account = new Account({
      username: '12345',
      password: 'test',
      email: 'test@test.com'
    });

    account.save(function () {
      done();
    });
  });

  it('Update should return updated account', function (done) {
    Account.findOne({username: '12345'}, function (err, account) {
      AccountsRepository.update(account._id, {
        username: NEW_USERNAME,
        password: account.password,
        email: account.email
      }).then(function(accounts) {
        assertAccountHasNewUsername(accounts);
        done();
      });
    });
  });

  it('Add order to account should return updated account', function (done) {
    Account.findOne({username: '12345'}, function (err, account) {
      ProductsRepository.save(
        Product.createFromJson({
          name: 'basketTest',
          price: 23,
          description: 'Letucce test, broccoli party',
          deliverAt: '11/30/2011'
        })
      ).then(function (product) {
        OrdersRepository.save(
          Order.createFromJson({
            active: 1,
            user: account._id,
            products: [product._id]
          })
        ).then(function (order) {
          AccountsRepository.addOrderToAccount(account._id, order._id).then(function(accounts) {
            assertAccountHasNewOrder(accounts);
            done();
          }.bind(this));
        }.bind(this))
      }.bind(this));});
  });
});

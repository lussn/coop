var Order = require('../domain/orders/Order');
var OrderRepository = require('../infrastructure/persistence/OrdersRepository');
var AccountsRepository = require('../infrastructure/persistence/AccountsRepository');
var OrganizationsRepository = require('../infrastructure/persistence/OrganizationsRepository');
var Promise = require('bluebird');

Array.prototype.flatten = function (depth = Infinity) { // move to polyfill
  return this.reduce(
    (list,v) =>
      list.concat(
        depth > 0 ?
          (depth > 1 && Array.isArray( v ) ?
              v.flatten( depth - 1 ) :
              v
          ) :
          [v]
      )
    , [] )
}

function _findProductInOrganization(org, productId) {
  return org.products.filter(function (prod) {
    return (productId == prod._id)
  })
}

function _isProductInOrganization(organizations, order) {
  return organizations.map(function (org) {
    return _findProductInOrganization(org, order.productId);
  }).flatten().shift();
}

var OrderRegisterService = function OrderRegisterService () {
  this.saveWithOneProduct = function (order, accountId) {
    return new Promise(function(resolve, reject) {
      OrganizationsRepository.findAll(accountId).then(function (organizations) {
        if (_isProductInOrganization(organizations, order)) {
          OrderRepository.save(
            Order.createFromJson({
              active: 1,
              user: accountId,
              products: [order.productId]
            })
          ).then(function (order) {
            AccountsRepository.addOrderToAccount(accountId, order._id)
              .then(function () {
                resolve(order);
              }, reject);
          }, reject);
        } else {
          reject();
        }
      }, reject)

    });
  }

  this.toggleActive = function (orderId) {
    return new Promise(function(resolve, reject) {
      OrderRepository.toggleActive(orderId).then(resolve, reject);
    });
  }
};
module.exports = new OrderRegisterService();

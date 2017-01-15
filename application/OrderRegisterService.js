var Order = require('../domain/orders/Order');
var OrderRepository = require('../infrastructure/persistence/OrdersRepository');
var AccountsRepository = require('../infrastructure/persistence/AccountsRepository');
var OrganizationsRepository = require('../infrastructure/persistence/OrganizationsRepository');
var Promise = require('bluebird');

function _findProductInOrganization(org, order, valid) {
  org.products.forEach(function (prod) {
    if (order.productId === prod._id) {
      valid = true;
    }
  }.bind(this))
  return valid;
}
var OrderRegisterService = function OrderRegisterService () {
  this.saveWithOneProduct = function (order, accountId) {
    return new Promise(function(resolve, reject) {
      OrganizationsRepository.findAll(accountId).then(function (organizations) {
        let valid = false;
        organizations.forEach(function (org) {
          valid = _findProductInOrganization.call(this, org, order, valid);
        }.bind(this))
        if (valid) {
          console.log('hola4')

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

var Order = require('../domain/orders/Order');
var OrderRepository = require('../infrastructure/persistence/OrdersRepository');
var AccountsRepository = require('../infrastructure/persistence/AccountsRepository');
var Promise = require('bluebird');

var OrderRegisterService = function OrderRegisterService() {
  this.saveWithOneProduct = function (order, accountId) {
    return new Promise(function(resolve, reject) {
      OrderRepository.save(
        Order.createFromJson({
          active: true,
          user: accountId,
          products: [order.productId]
        })
      ).then(function (order) {
        AccountsRepository.addOrderToAccount(accountId, order._id)
          .then(function () {
            resolve(order);
          }, reject);
      }, reject);
    });
  }

  this.toggleActive = function (orderId) {
    return new Promise(function(resolve, reject) {
      OrderRepository.findById(orderId).then(function (order) {
        OrderRepository.toggleActive(orderId, !order.active).then(resolve, reject);
      });
    });
  }
};
module.exports = new OrderRegisterService();

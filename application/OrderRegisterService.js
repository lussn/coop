var Order = require('../domain/orders/Order');
var OrderRepository = require('../infrastructure/persistence/OrdersRepository');

var OrderRegisterService = function OrderRegisterService() {
  this.saveWithOneProduct = function (order) {
    return OrderRepository.save(
      Order.createFromJson({
        active: true,
        user: order.accountId,
        products: [order.productId]
      })
    );
  }
};
module.exports = new OrderRegisterService();

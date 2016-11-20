var OrderPersistenceSchema = require('./schemas/OrderPersistenceSchema.js');

var OrdersRepository = function OrdersRepository() {
  this.save = function (item) {
    var order = OrderPersistenceSchema.createPersistenceModel(
      item
    );
    return order.save();
  }

  this.findById = function (orderId) {
    return OrderPersistenceSchema.find({_id: orderId}).populate('user products').exec();
  }
};

module.exports = new OrdersRepository();

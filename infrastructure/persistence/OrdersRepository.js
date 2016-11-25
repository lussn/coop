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

  this.toggleActive = function (orderId) {
    return OrderPersistenceSchema.findOneAndUpdate(orderId, { $bit: { active: { xor: Number(1) } } }, {new: true}).exec();
  }
};

module.exports = new OrdersRepository();

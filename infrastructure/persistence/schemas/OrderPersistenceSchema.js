var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var OrderPersistenceSchema = new Schema({
  active: Boolean,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null }
});

OrderPersistenceSchema.statics.createPersistenceModel = function createPersistenceModel(
  order
) {
  return new this({
    active: order.active,
    user: accountId,
    createdAt: order.createdAt,
    deliverAt: moment(order.deliverAt, 'DD/MM/YYYY').toDate()
  });
  // TODO: order.products.push(productId); PRODUCTS?
};

module.exports = mongoose.model('Order', OrderPersistenceSchema);

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var moment = require('moment');
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
    user: order.user,
    products: order.products,
    deliverAt: moment(order.deliverAt, 'DD/MM/YYYY').toDate()
  });
};

module.exports = mongoose.model('Order', OrderPersistenceSchema);

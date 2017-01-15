var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var moment = require('moment');
var Schema = mongoose.Schema;

var ProductPersistenceSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  enabled: Boolean,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
  createdAt: { type: Date, default: Date.now },
  deliverAt: { type: Date, default: null}
});

ProductPersistenceSchema.statics.createPersistenceModel = function createPersistenceModel(
  item,
  accountId
) {
  return new this({
    name: item.name,
    price: item.price,
    description: item.description,
    enabled: item.enabled,
    user: accountId,
    orders: item.orders,
    createdAt: item.createdAt,
    deliverAt: moment(item.deliverAt, 'YYYY/MM/DD').toDate()
  });
};

module.exports = mongoose.model('Product', ProductPersistenceSchema);

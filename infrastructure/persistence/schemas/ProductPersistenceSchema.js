var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var ProductPersistenceSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  enabled: Boolean,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  created_at: { type: Date, default: Date.now },
  deliver_at: { type: Date, default: null }
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
    created_at: item.created_at,
    deliver_at: item.deliver_at
  });
};

module.exports = mongoose.model('Product', ProductPersistenceSchema);

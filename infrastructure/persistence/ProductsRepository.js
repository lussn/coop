var ProductPersistenceSchema = require('./schemas/ProductPersistenceSchema.js');
var moment = require('moment');

var ProductsRepository = function ProductsRepository() {
  this.save = function (item, ownerId) {
    var product = ProductPersistenceSchema.createPersistenceModel(
      item,
      ownerId
    );
    return product.save();
  }

  this.update = function (productId, product) {
    return new Promise(function(resolve, reject) {
      ProductPersistenceSchema.findOneAndUpdate({_id: productId}, product, {new: true}, function (err, product) {
        if (err) {
          reject(err);
        } else {
          resolve(product);
        }
      });
    });
  }
};
module.exports = new ProductsRepository();

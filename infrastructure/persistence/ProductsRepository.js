var ProductPersistenceSchema = require('./schemas/ProductPersistenceSchema.js');

var ProductsRepository = function ProductsRepository() {
  this.save = function (item, ownerId) {
    var product = ProductPersistenceSchema.createPersistenceModel(
      item,
      ownerId
    );
    return product.save();
  }
};
module.exports = new ProductsRepository();

var Product = function () {
  this._id = null;
  this.name = null;
  this.price = null;
  this.description = null;
  this.enabled = null;
  this.user = null;
  this.orders = [];
  this.createdAt = null;
  this.deliverAt = null;

  this.createFromJson = function (product) {
    this._id = product._id;
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.enabled = product.enabled;
    this.user = product.user;
    this.orders = product.orders;
    this.createdAt = product.createdAt;
    this.deliverAt = product.deliverAt;
    return this;
  };

  return this;
};

module.exports = new Product();

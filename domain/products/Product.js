var Product = function () {
  this._id = null;
  this.name = null;
  this.price = null;
  this.description = null;
  this.enabled = null;
  this.user = null;
  this.created_at = null;
  this.deliver_at = null;

  this.createFromJson = function (product) {
    this._id = product._id;
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.enabled = product.enabled;
    this.user = product.user;
    this.created_at = product.created_at;
    this.deliver_at = product.deliver_at;
    return this;
  };

  return this;
};

module.exports = new Product();

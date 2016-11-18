var Order = function () {
  this._id = null;
  this.active = null;
  this.user = null;
  this.products = null;
  this.createdAt = null;
  this.deletedAt = null;

  this.createFromJson = function (order) {
    this._id = order._id;
    this.active = order.active;
    this.user = order.user;
    this.products = order.products;
    this.createdAt = order.createdAt;
    this.deletedAt = order.deletedAt;
    return this;
  };

  return this;
};

module.exports = new Order();

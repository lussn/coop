var Organization = function () {
  this._id = null;
  this.name = null;
  this.code = null;
  this.email = null;
  this.members = [];
  this.products = [];

  this.createFromJson = function (organization) {
    this._id = organization._id;
    this.name = organization.name;
    this.code = organization.code;
    this.email = organization.email;
    this.members = organization.members;
    this.products = organization.products;
    return this;
  };

  return this;
};

module.exports = new Organization();

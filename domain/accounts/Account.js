var Account = function () {
  this._id = null;
  this.username = null;
  this.password = null;
  this.email = null;
  this.role = 'editor';
  this.orders = [];

  this.createFromJson = function (account) {
    this._id = account._id;
    this.username = account.username;
    this.password = account.password;
    this.email = account.email;
    this.role = 'editor';
    this.orders = account.orders;
    return this;
  };

  return this;
};

module.exports = new Account();

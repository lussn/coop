var Account = function () {
  this._id = null;
  this.username = null;
  this.password = null;
  this.email = null;
  this.role = [];

  this.createFromJson = function (account) {
    this._id = account._id;
    this.username = account.username;
    this.password = account.password;
    this.email = account.email;
    this.role = account.role;
    return this;
  };

  return this;
};

module.exports = new Account();

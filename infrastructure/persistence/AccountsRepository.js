var Account = require('./authentication/Account');

var AccountsRepository = function AccountsRepository() {
  this.save = function (accountModel, password, callback, callbackError) {
    Account.register(accountModel, password, function (err, account) {
      if (err) {
        return callbackError('Sorry. That username already exists. Try again.', err);
      }
      return callback(account);
    });
  }
};

module.exports = new AccountsRepository();

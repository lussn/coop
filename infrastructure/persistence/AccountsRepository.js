var Account = require('./authentication/Account');

var AccountsRepository = function AccountsRepository() {
  this.save = function (accountModel, password) {
    return new Promise(function(resolve, reject) {
      Account.register(accountModel, password, function(err, account) {
        if (err) {
          reject(err);
        } else {
          resolve(account);
        }
      });
    });
  }

  this.update = function (accountId, account, callback) {
    Account.findOneAndUpdate({_id: accountId}, account, {new: true}, callback);
  }
};

module.exports = new AccountsRepository();

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

  this.update = function (accountId, account) {
    return new Promise(function(resolve, reject) {
      Account.findOneAndUpdate({_id: accountId}, account, {new: true}, function (err, account) {
        if (err) {
          reject(err);
        } else {
          resolve(account);
        }
      });
    });
  }
};

module.exports = new AccountsRepository();

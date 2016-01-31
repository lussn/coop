var Account = require('../../domain/accounts/Account');

var AccountsRepository = function AccountsRepository() {
	this.save = function (accountModel, password, callback, callbackError) {
		Account.register(accountModel, password, function(err, account) {
	        if (err) {
	          return callbackError('Sorry. That username already exists. Try again.');
	        }
	        return callback();
		});
	}
};
module.exports = new AccountsRepository();
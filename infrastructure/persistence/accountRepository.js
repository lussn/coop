var Account = require('../../domain/account/account');

var accountRepository = function accountRepository() {
	this.save = function (accountModel, password, callback, callbackError) {
		Account.register(accountModel, password1, function(err, account) {
	        if (err) {
	          return callbackError('Sorry. That username already exists. Try again.');
	        }
	        return callback();
		});
	}
};
module.exports = new accountRepository();
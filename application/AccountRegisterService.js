var Account = require('../domain/accounts/Account');
var AccountsRepository = require('../infrastructure/persistence/AccountsRepository');

var validateUsername = function (username) {
	if(username.length < 5) {
		throw new Error('Sorry. Username with 5 characters min. Try again.');
	}
}

var validatePassword = function (password1, password2) {
	if(password1.length < 5) {
		throw new Error('Sorry. Password with 5 characters min. Try again.');
	}
	if(password1 !== password2) {
		throw new Error('Sorry. Passwords don\'t match. Try again.');
	}
}

var AccountRegisterService = function AccountRegisterService() {
	this.register = function (credentials, callback, callbackError) { //TODO To promise object
		var username = credentials.username;
		var password1 = credentials.password1;
		var password2 = credentials.password2;

		try {
			validateUsername(username);
			validatePassword(password1, password2);

			var accountModel = new Account({ username : username });
			AccountsRepository.save(accountModel, password1, callback, callbackError);
		} catch (error) {
			callbackError(error);
		}
	}
};
module.exports = new AccountRegisterService();
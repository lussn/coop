var Account = require('../domain/accounts/Account');
var AccountsRepository = require('../infrastructure/persistence/AccountsRepository');
var ValidatorService = require('./ValidatorService');

var AccountRegisterService = function AccountRegisterService() {
	this.register = function (credentials, callback, callbackError) { //TODO To promise object
		var username = credentials.username;
		var email = credentials.email;
		var password1 = credentials.password1;
		var password2 = credentials.password2;

		try {
			ValidatorService.validateUsername(username);
			ValidatorService.validateEmail(email);
			ValidatorService.validatePassword(password1, password2);

			var accountModel = new Account({
				username : username,
				email : email
			});
			AccountsRepository.save(accountModel, password1, callback, callbackError);
		} catch (error) {
			callbackError(error);
		}
	}
};
module.exports = new AccountRegisterService();

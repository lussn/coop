var AccountRegisterService = require('./application/AccountRegisterService.js');

describe('AccountRegisterService', function() {
	var credentials = {
		username: 'testusername',
		password1: 'passtest',
		password2: 'passtest'
	};

	describe('Validate', function() {
	    it('username with less than 5 character must throw an error', function(done) {
	    	credentials.username = 'test';
	        AccountRegisterService.register(credentials, callback, callbackError);
	    });
	});

});

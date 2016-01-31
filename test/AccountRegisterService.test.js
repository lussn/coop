var AccountRegisterService = require('../application/AccountRegisterService.js');
var sinon = require('sinon');
var assert = require('chai').assert;

describe('AccountRegisterService', function() {
	var credentials = {
		username: 'testusername',
		password1: 'passtest',
		password2: 'passtest'
	};

	describe('Validate', function() {
	    it('username with less than 5 character must throw an error', function(done) {
	    	credentials.username = 'test';
	    	var callback = sinon.spy();
	    	var callbackError = sinon.spy();
	        AccountRegisterService.register(credentials, callback, callbackError);
	    	assert.equal(true, callbackError.calledOnce);
	    	done();
	    });

	    it('password1 with less than 5 character must throw an error', function(done) {
	    	credentials.password1 = 'test';
	    	var callback = sinon.spy();
	    	var callbackError = sinon.spy();
	        AccountRegisterService.register(credentials, callback, callbackError);
	    	assert.equal(true, callbackError.calledOnce);
	    	done();
	    });

	    it('password1 and password2 dont match and must throw an error', function(done) {
	    	credentials.password1 = 'testing';
	    	var callback = sinon.spy();
	    	var callbackError = sinon.spy();
	        AccountRegisterService.register(credentials, callback, callbackError);
	    	assert.equal(true, callbackError.calledOnce);
	    	done();
	    });
	});

	describe('Register new user', function() {
	    it('should save the new user', function(done) {
	    	credentials.password1 = 'testing';
	    	var callback = sinon.spy();
	    	var callbackError = sinon.spy();
	        AccountRegisterService.register(credentials, callback, callbackError);
	    	assert.equal(true, callbackError.calledOnce);
	    	done();
	    });
	});
});

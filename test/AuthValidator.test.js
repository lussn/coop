var AuthValidator = require('../resources/validator/AuthValidator.js');
var sinon = require('sinon');
var assert = require('chai').assert;

describe('AuthValidator', function() {
	describe('ValidateUser', function() {
	    var next = sinon.spy();
	    var req = { user: 'user' };
	    var res = { redirect: sinon.spy() };
	    it('should call next if user exists', function(done) {
	        AuthValidator.validateUser(req, res, next);
	    	assert.equal(true, next.calledOnce);
	    	done();
	    });
	    it('should redirect to login if user dont exists', function(done) {
	    	var req = { user: undefined };
	        AuthValidator.validateUser(req, res, next);
	    	assert.equal(true, next.calledOnce);
	    	done();
	    });
	});
});

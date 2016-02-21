var sinon = require('sinon');
var assert = require('chai').assert;
var proxyquire =  require('proxyquire');

const ACCOUNT_ID = '56c9dd2c5606c3b20f86220c';

describe('CooperativeAddService', function() {

	describe('Save cooperative', function() {

		before(function () {
			this.CooperativesRepository = { save: sinon.spy() };
        	this.CooperativeAddService = proxyquire(
        		'../application/CooperativeAddService.js',
        		{'../infrastructure/persistence/CooperativesRepository': this.CooperativesRepository}
        	);
    	});

	    it('should call cooperatives repository with cooperative model', function(done) {
	        this.CooperativeAddService.save({
				name: 'TEST',
				code: 'TEST123',
				email: 'test@test.com'
			}, ACCOUNT_ID);
	    	assert.equal(true, this.CooperativesRepository.save.calledOnce);
	    	done();
	    });
	});
});
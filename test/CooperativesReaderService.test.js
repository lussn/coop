var sinon = require('sinon');
var assert = require('chai').assert;
var proxyquire =  require('proxyquire');

const ACCOUNT_ID = 5;

describe('CooperativesReaderService', function() {

	describe('Get all cooperatives', function() {

		before(function () {
			this.CooperativesRepository = { findAll: sinon.spy() };
        	this.CooperativesReaderService = proxyquire(
        		'../application/CooperativesReaderService.js',
        		{'../infrastructure/persistence/CooperativesRepository': this.CooperativesRepository}
        	);
    	});

	    it('should call cooperatives repository with account id', function(done) {
	        this.CooperativesReaderService.findAll(ACCOUNT_ID);
	    	assert.equal(true, this.CooperativesRepository.findAll.withArgs(ACCOUNT_ID).calledOnce);
	    	done();
	    });
	});
});
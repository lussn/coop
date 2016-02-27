var sinon = require('sinon');
var assert = require('chai').assert;
var proxyquire =  require('proxyquire');

const ACCOUNT_ID = 5;
const COOP_ID = '7777dd2c5606c3b20f86227c';

describe('CooperativesReaderService', function() {

	describe('Get all cooperatives', function() {

		before(function () {
			this.CooperativesRepository = { findAll: sinon.spy(), findById: sinon.spy() };
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

		it('should call cooperatives repository with account id and cooperative id', function(done) {
			this.CooperativesReaderService.findById(ACCOUNT_ID, COOP_ID);
			assert.equal(true, this.CooperativesRepository.findById.withArgs(ACCOUNT_ID, COOP_ID).calledOnce);
			done();
		});
	});
});

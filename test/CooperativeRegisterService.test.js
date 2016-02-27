var sinon = require('sinon');
var assert = require('chai').assert;
var proxyquire =  require('proxyquire');

const ACCOUNT_ID = '56c9dd2c5606c3b20f86220c';
const COOP_ID = '7777dd2c5606c3b20f86227c';

describe('CooperativeRegisterService', function() {

	before(function () {
		this.CooperativesRepository = {
			save: sinon.spy(),
			update: sinon.spy(),
			delete: sinon.spy()
		};
		this.CooperativeRegisterService = proxyquire(
			'../application/CooperativeRegisterService.js',
			{'../infrastructure/persistence/CooperativesRepository': this.CooperativesRepository}
		);
	});

	it('Save should call cooperatives repository with cooperative model', function(done) {
		this.CooperativeRegisterService.save({
			name: 'TEST',
			code: 'TEST123',
			email: 'test@test.com'
		}, ACCOUNT_ID);
		assert.equal(true, this.CooperativesRepository.save.calledOnce);
		done();
	});

	it('Update should call cooperatives repository with cooperative model', function(done) {
		this.CooperativeRegisterService.update({
			name: 'TEST',
			code: 'TEST123',
			email: 'test@test.com'
		}, COOP_ID);
		assert.equal(true, this.CooperativesRepository.update.calledOnce);
		done();
	});

	it('Delete should call cooperatives repository with id', function(done) {
		this.CooperativeRegisterService.delete(COOP_ID);
		assert.equal(true, this.CooperativesRepository.delete.calledOnce);
		done();
	});
});

var sinon = require('sinon');
var assert = require('chai').assert;
var proxyquire =  require('proxyquire');

const ACCOUNT_ID = '56c9dd2c5606c3b20f86220c';
const COOP_ID = '7777dd2c5606c3b20f86227c';

describe('OrganizationRegisterService', function() {

	before(function () {
		this.OrganizationsRepository = {
			save: sinon.spy(),
			update: sinon.spy(),
			delete: sinon.spy()
		};
		this.OrganizationRegisterService = proxyquire(
			'../application/OrganizationRegisterService.js',
			{'../infrastructure/persistence/OrganizationsRepository': this.OrganizationsRepository}
		);
	});

	it('Save should call organizations repository with organization model', function(done) {
		this.OrganizationRegisterService.save({
			name: 'TEST',
			code: 'TEST123',
			email: 'test@test.com'
		}, ACCOUNT_ID);
		assert.equal(true, this.OrganizationsRepository.save.calledOnce);
		done();
	});

	it('Update should call organizations repository with organization model', function(done) {
		this.OrganizationRegisterService.update({
			name: 'TEST',
			code: 'TEST123',
			email: 'test@test.com'
		}, COOP_ID);
		assert.equal(true, this.OrganizationsRepository.update.calledOnce);
		done();
	});

	it('Delete should call organizations repository with id', function(done) {
		this.OrganizationRegisterService.delete(COOP_ID);
		assert.equal(true, this.OrganizationsRepository.delete.calledOnce);
		done();
	});
});

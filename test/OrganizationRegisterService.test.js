var sinon = require('sinon');
var assert = require('chai').assert;
var proxyquire = require('proxyquire');

const ACCOUNT_ID = '56c9dd2c5606c3b20f86220c';
const COOP_ID = '7777dd2c5606c3b20f86227c';

function assertSaveIsCalled() {
  assert.equal(true, this.OrganizationsRepository.save.calledOnce);
}

function assertUpdateIsCalled() {
  assert.equal(true, this.OrganizationsRepository.update.calledOnce);
}

function assertDeleteIsCalled() {
  assert.equal(true, this.OrganizationsRepository.delete.calledOnce);
}

function assertDeleteAccount() {
  assert.equal(true, this.OrganizationsRepository.deleteAccount.calledOnce);
}

describe('OrganizationRegisterService', function () {

  before(function () {
    this.OrganizationsRepository = {
      save: sinon.spy(),
      update: sinon.spy(),
      delete: sinon.spy(),
      deleteAccount: sinon.spy()
    };
    this.OrganizationRegisterService = proxyquire(
      '../application/OrganizationRegisterService.js',
      {'../infrastructure/persistence/OrganizationsRepository': this.OrganizationsRepository}
    );
  });

  it('Save should call organizations repository with organization model', function (done) {
    this.OrganizationRegisterService.save({
      name: 'TEST',
      code: 'TEST123',
      email: 'test@test.com'
    }, ACCOUNT_ID, function(){});
    assertSaveIsCalled.call(this);
    done();
  });

  it('Update should call organizations repository with organization model', function (done) {
    this.OrganizationRegisterService.update({
      name: 'TEST',
      code: 'TEST123',
      email: 'test@test.com'
    }, COOP_ID);
    assertUpdateIsCalled.call(this);
    done();
  });

  it('Delete should call organizations repository with id', function (done) {
    this.OrganizationRegisterService.delete(COOP_ID);
    assertDeleteIsCalled.call(this);
    done();
  });

  it('Delete account should call organizations repository with accountId and organizationId', function (done) {
    var adminId = 1;
    this.OrganizationRegisterService.deleteAccount(ACCOUNT_ID, COOP_ID, adminId);
    assertDeleteAccount.call(this);
    done();
  });
});

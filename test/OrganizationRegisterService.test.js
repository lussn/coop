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
  assert.equal(true, this.OrganizationsRepository.deleteAccountFromOrganization.calledOnce);
}

function assertNotDeleteAccount() {
  assert.equal(false, this.OrganizationsRepository.deleteAccountFromOrganization.calledTwice);
}

function prepareFindById(accountId) {
  this.OrganizationsRepository.findByIdWithoutPopulate.yields(
    [{members: [accountId]}]
  );
}

function prepareAccountSave() {
  this.AccountsRepository.save.yields(
    {
      username: 'TEST',
      password: 'TEST123',
      email: 'test@test.com',
      _id: 'eeeeeeec5606c3b20f86220c'
    }
  );
}

function assertFindOrganization() {
  assert.equal(true, this.OrganizationsRepository.findByIdWithoutPopulate.withArgs(ACCOUNT_ID, COOP_ID).calledOnce);
}

function assertSaveAccount() {
  assert.equal(true, this.AccountsRepository.save.calledOnce);
}

function assertAddAccountToOrganization() {
  assert.equal(true, this.OrganizationsRepository.addAccountToOrganization.calledOnce);
}

describe('OrganizationRegisterService', function () {

  before(function () {
    this.OrganizationsRepository = {
      save: sinon.spy(),
      update: sinon.spy(),
      addAccountToOrganization: sinon.spy(),
      delete: sinon.spy(),
      deleteAccountFromOrganization: sinon.spy(),
      findByIdWithoutPopulate: sinon.stub()
    };

    this.AccountsRepository = {
      save: sinon.stub()
    };

    this.OrganizationRegisterService = proxyquire(
      '../application/OrganizationRegisterService.js',
      {
        '../infrastructure/persistence/OrganizationsRepository': this.OrganizationsRepository,
        '../infrastructure/persistence/AccountsRepository': this.AccountsRepository
      }
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

  it('SaveAccount should call organizations repository with organizationId and account model', function (done) {
    prepareFindById.call(this, ACCOUNT_ID);
    prepareAccountSave.call(this);

    this.OrganizationRegisterService.saveAccount({
      username: 'TEST',
      password: 'TEST123',
      email: 'test@test.com'
    }, COOP_ID, ACCOUNT_ID, function(){});

    assertFindOrganization.call(this);
    assertSaveAccount.call(this);
    assertAddAccountToOrganization.call(this);
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
    prepareFindById.call(this, adminId);

    this.OrganizationRegisterService.deleteAccountFromOrganization(ACCOUNT_ID, COOP_ID, adminId);
    assertFindOrganization.call(this);
    assertDeleteAccount.call(this);
    done();
  });

  it('Delete account should not call organizations repository with wrong accountId and organizationId', function (done) {
    var adminId = 1;
    prepareFindById.call(this, 0);

    this.OrganizationRegisterService.deleteAccountFromOrganization(ACCOUNT_ID, COOP_ID, adminId);
    assertFindOrganization.call(this);
    assertNotDeleteAccount.call(this);
    done();
  });
});

var sinon = require('sinon');
var Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird);
var assert = require('chai').assert;
var proxyquire = require('proxyquire');

const ACCOUNT_ID = '56c9dd2c5606c3b20f86220c';
const ACCOUNT_FOR_PRODUCT_ID = '898987bhmnd8c3b20f86220c';
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
  this.OrganizationsRepository.findByIdWithoutPopulate.resolves(
    [{members: [accountId]}]
  );
}

function prepareAccountSave() {
  this.AccountsRepository.save.resolves(
    {
      username: 'TEST',
      password: 'TEST123',
      email: 'test@test.com',
      _id: 'eeeeeeec5606c3b20f86220c'
    }
  );
}

function prepareProductSave() {
  this.ProductsRepository.save.resolves(
    {
      name: 'TEST',
      price: 'TEST123',
      description: 'TEST5555',
      deliverAt: '11/12/2016',
      _id: 'eeeeeeec568883b20f86220c'
    }
  );
}

function prepareAddAccountToOrganization() {
  this.OrganizationsRepository.addAccountToOrganization.resolves({});
}

function prepareAddProductToOrganization() {
  this.OrganizationsRepository.addProductToOrganization.resolves({});
}

function assertFindOrganizationByAccount() {
  assert.equal(true, this.OrganizationsRepository.findByIdWithoutPopulate.withArgs(ACCOUNT_ID, COOP_ID).calledOnce);
}

function assertSaveAccount() {
  assert.equal(true, this.AccountsRepository.save.calledOnce);
}

function assertSaveProduct() {
  assert.equal(true, this.ProductsRepository.save.calledOnce);
}

function assertAddAccountToOrganization() {
  assert.equal(true, this.OrganizationsRepository.addAccountToOrganization.calledOnce);
}

function assertAddProductToOrganization() {
  assert.equal(true, this.OrganizationsRepository.addProductToOrganization.calledOnce);
}

function assertAccountIsUpdated() {
  assert.equal(true, this.AccountsRepository.update.calledOnce);
}

function assertProductIsUpdated() {
  assert.equal(true, this.ProductsRepository.update.calledOnce);
}

function prepareUpdateAccount() {
  this.AccountsRepository.update.resolves(
    {
      username: 'TEST',
      password: 'TEST123',
      email: 'test@test.com',
      _id: 'testId'
    }
  );
}
function prepareUpdateProduct() {
  this.ProductsRepository.update.resolves(
    {
      name: 'TEST',
      price: 'TEST123',
      description: 'TEST5555',
      deliverAt: '11/12/2016',
      _id: 'testId'
    }
  );
}


function prepareDelete() {
  this.OrganizationsRepository.delete.resolves({});
}

function prepareDeleteAccount() {
  this.OrganizationsRepository.deleteAccountFromOrganization.resolves({});
}

describe('OrganizationRegisterService', function () {
  before(function () {
    this.OrganizationsRepository = {
      save: sinon.spy(),
      update: sinon.spy(),
      addAccountToOrganization: sinon.stub(),
      addProductToOrganization: sinon.stub(),
      delete: sinon.stub(),
      deleteAccountFromOrganization: sinon.stub(),
      findByIdWithoutPopulate: sinon.stub()
    };

    this.AccountsRepository = {
      save: sinon.stub(),
      update: sinon.stub()
    };

    this.ProductsRepository = {
      save: sinon.stub(),
      update: sinon.stub()
    };

    this.OrganizationRegisterService = proxyquire(
      '../../application/OrganizationRegisterService.js',
      {
        '../infrastructure/persistence/OrganizationsRepository': this.OrganizationsRepository,
        '../infrastructure/persistence/AccountsRepository': this.AccountsRepository,
        '../infrastructure/persistence/ProductsRepository': this.ProductsRepository
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
    prepareAddAccountToOrganization.call(this);

    this.OrganizationRegisterService.saveAccount({
      username: 'TEST',
      password: 'TEST123',
      email: 'test@test.com'
    }, COOP_ID, ACCOUNT_ID).then(function () {
      assertFindOrganizationByAccount.call(this);
      assertSaveAccount.call(this);
      assertAddAccountToOrganization.call(this);
      done();
    }.bind(this));
  });

  it('SaveProduct should call organizations repository with organizationId and product model', function (done) {
    prepareFindById.call(this, ACCOUNT_FOR_PRODUCT_ID);
    prepareProductSave.call(this);
    prepareAddProductToOrganization.call(this);

    this.OrganizationRegisterService.saveProduct({
      name: 'TEST',
      price: 'TEST123',
      description: 'TEST5555',
      deliverAt: '11/12/2016'
    }, COOP_ID, ACCOUNT_FOR_PRODUCT_ID).then(function () {
      assertFindOrganizationByAccount.call(this);
      assertSaveProduct.call(this);
      assertAddProductToOrganization.call(this);
      done();
    }.bind(this));
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

  it('Update account should call organizations repository with account model', function (done) {
    prepareFindById.call(this, ACCOUNT_ID);
    prepareUpdateAccount.call(this);

    this.OrganizationRegisterService.updateAccountFromOrganization(
      {
        username: 'TEST',
        password: 'TEST123',
        email: 'test@test.com',
        _id: 'testId'
      },
      COOP_ID,
      ACCOUNT_ID).then(
      function () {
        assertFindOrganizationByAccount.call(this);
        assertAccountIsUpdated.call(this);
        done();
      }.bind(this));
  });

  it('Update product should call organizations repository with product model', function (done) {
    prepareFindById.call(this, ACCOUNT_FOR_PRODUCT_ID);
    prepareUpdateProduct.call(this);

    this.OrganizationRegisterService.updateProductFromOrganization(
      {
        name: 'TEST',
        price: 'TEST123',
        description: 'TEST5555',
        deliverAt: '11/12/2016',
        _id: 'testId'
      },
      COOP_ID,
      ACCOUNT_FOR_PRODUCT_ID).then(
      function () {
        assertFindOrganizationByAccount.call(this);
        assertProductIsUpdated.call(this);
        done();
      }.bind(this));
  });

  it('Delete should call organizations repository with id', function (done) {
    prepareDelete.call(this);

    this.OrganizationRegisterService.delete(COOP_ID).then(
      function () {
        assertDeleteIsCalled.call(this);
        done();
      }.bind(this)
    );
  });

  it('Delete account should call organizations repository with accountId and organizationId', function (done) {
    var adminId = 1;
    prepareFindById.call(this, adminId);
    prepareDeleteAccount.call(this);

    this.OrganizationRegisterService.deleteAccountFromOrganization(
      ACCOUNT_ID,
      COOP_ID,
      adminId
    ).then(function () {
        assertFindOrganizationByAccount.call(this);
        assertDeleteAccount.call(this);
        done();
      }.bind(this)
    );
  });

  it('Delete account should not call organizations repository with wrong accountId and organizationId', function (done) {
    var adminId = 1;
    prepareFindById.call(this, 0);
    prepareDeleteAccount.call(this);

    this.OrganizationRegisterService.deleteAccountFromOrganization(ACCOUNT_ID, COOP_ID, adminId);
    assertFindOrganizationByAccount.call(this);
    assertNotDeleteAccount.call(this);
    done();
  });
});

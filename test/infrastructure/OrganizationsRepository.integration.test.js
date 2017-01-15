var mongoose = require('mongoose');
var OrganizationsRepository = require("../../infrastructure/persistence/OrganizationsRepository.js");
var AccountsRepository = require("../../infrastructure/persistence/AccountsRepository.js");
var ProductsRepository = require("../../infrastructure/persistence/ProductsRepository.js");
var OrganizationPersistenceSchema = require('../../infrastructure/persistence/schemas/OrganizationPersistenceSchema.js');
var Account = require('../../infrastructure/persistence/authentication/Account');
var Product = require('../../domain/products/Product');
var assert = require('chai').assert;
var db;

function _createOrganization (name) {
  var organization = {
    name: name,
    code: name,
    email: name + '@test.com'
  };
  OrganizationsRepository.save(organization, this.accountId).then(function (organization) {
    this.organizationId = organization._id;
  }.bind(this));
};

function assertGetTwoOrganizations(organizations) {
  assert.equal(2, organizations.length);
}

function assertGetOneOrganization(organizations) {
  assert.equal(1, organizations.length);
}

function assertGetZeroOrganizations(organizations) {
  assert.equal(0, organizations.length);
}

function assertGetSameOrganization(organizations) {
  assert.equal('testupdate', organizations[0].name);
}

function _createOwner() {
  return new Account({
    username: 'test',
    email: 'test@coop.com'
  });
}

function _createMember(name) {
  return new Account({
    username: name,
    email: name + '@coop.com'
  });
}

function _createProduct(name) {
  return Product.createFromJson({
    name: name,
    price: 23,
    description: 'Letucce test, broccoli party',
    deliverAt: '2017/11/30'
  });
}

function assertRetrievePopulatedAccount(organizations) {
  assert.equal(String(this.accountId), String(organizations[0].members[0]._id));
}

function assertSaveAccount(organizations) {
  assert.equal(String(this.newAccountId), String(organizations[0].members[1]._id));
}

function assertSaveProduct(organizations) {
  assert.equal(String(this.productId), String(organizations[0].products[0]._id));
}

function _saveNewAccount(name, callback) {
  var newAccountModel = _createMember(name);
  AccountsRepository.save(newAccountModel, 'test').then(callback);
}

describe('OrganizationsRepository', function () {

  before(function (done) {
    db = mongoose.connect('mongodb://localhost/test');
    var accountModel = _createOwner();
    _saveNewAccount.call(this, 'test2', function (account) {
      this.newAccountId = account._id;
    }.bind(this));

    ProductsRepository.save(
      _createProduct('basketTest')
    ).then(function (product) {
      this.productId = product._id
    }.bind(this));

    AccountsRepository.save(accountModel, 'test').then(function (account) {
      this.accountId = account._id;
      _createOrganization.call(this, 'test1');
      _createOrganization.call(this, 'test2');
      done();
    }.bind(this));
  });

  it('findAll should return all organizations', function (done) {
    OrganizationsRepository.findAll(this.accountId).then(function (organizations) {
      assertGetTwoOrganizations(organizations);
      done();
    });
  });

  it('findById should return a organization with populated accounts', function (done) {
    OrganizationsRepository.findById(this.accountId, this.organizationId).then(function (organizations) {
      assertGetOneOrganization(organizations);
      assertRetrievePopulatedAccount.call(this, organizations);
      done();
    }.bind(this));
  });

  it('findByIdWithoutPopulate should return an organization', function (done) {
    OrganizationsRepository.findById(this.accountId, this.organizationId).then(function (organizations) {
      assertGetOneOrganization(organizations);
      done();
    }.bind(this));
  });

  it('Update should edit an organization', function (done) {
    var coop = {
      name: 'testupdate',
      code: 'testupdate',
      email: 'testupdate@test.com'
    };
    OrganizationsRepository.update(coop, this.organizationId).then(function () {
      OrganizationsRepository.findById(this.accountId, this.organizationId).then(function (organizations) {
        assertGetOneOrganization(organizations);
        assertGetSameOrganization(organizations);
        done();
      }.bind(this));
    }.bind(this));
  });

  it('addAccountToOrganization should add an organization member', function (done) {
    OrganizationsRepository.addAccountToOrganization(this.newAccountId, this.organizationId).then(function () {
      OrganizationsRepository.findById(this.accountId, this.organizationId).then(function (organizations) {
        assertGetOneOrganization(organizations);
        assertGetSameOrganization(organizations);
        assertSaveAccount.call(this, organizations);
        done();
      }.bind(this));
    }.bind(this));
  });

  it('addProductToOrganization should add an organization product', function (done) {
    OrganizationsRepository.addProductToOrganization(this.productId, this.organizationId).then(function () {
      OrganizationsRepository.findById(this.accountId, this.organizationId).then(function (organizations) {
        assertGetOneOrganization(organizations);
        assertGetSameOrganization(organizations);
        assertSaveProduct.call(this, organizations);
        done();
      }.bind(this));
    }.bind(this));
  });

  it('Delete account should delete an account from the organization', function (done) {
    _saveNewAccount('testUser', function (account) {
      OrganizationsRepository.addAccountToOrganization(account._id, this.organizationId).then(function () {
        OrganizationsRepository.findById(account._id, this.organizationId).then(function (organizations) {
          assertGetOneOrganization(organizations);
          OrganizationsRepository.deleteAccountFromOrganization(account._id, this.organizationId).then(function () {
            OrganizationsRepository.findById(account._id, this.organizationId).then(function (organizations) {
              assertGetZeroOrganizations(organizations);
              done();
            }.bind(this));
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }.bind(this));
  });

  it('Delete should delete an organization', function (done) {
    OrganizationsRepository.delete(this.organizationId);
    OrganizationsRepository.findById(this.accountId, this.organizationId).then(function (organizations) {
      assertGetZeroOrganizations(organizations);
      done();
    }.bind(this));
  });

  after(function (done) {
    OrganizationPersistenceSchema.remove({}, function () {});
    mongoose.connection.close();
    done();
  });
});

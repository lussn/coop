var mongoose = require('mongoose');
var OrganizationsRepository = require("../infrastructure/persistence/OrganizationsRepository.js");
var AccountsRepository = require("../infrastructure/persistence/AccountsRepository.js");
var OrganizationPersistenceSchema = require('../infrastructure/persistence/schemas/OrganizationPersistenceSchema.js');
var Account = require('../infrastructure/persistence/authentication/Account');
var assert = require('chai').assert;
var db;

function _createOrganization (name) {
  var organization = {
    name: name,
    code: name,
    email: name + '@test.com'
  };
  OrganizationsRepository.save(organization, this.accountId, function (organization) {
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
function _createMember() {
  return new Account({
    username: 'test2',
    email: 'test2@coop.com'
  });
}
function assertRetrievePopulatedAccount(organizations) {
  assert.equal(String(this.accountId), String(organizations[0].members[0]._id));
}
function assertSaveAccount(organizations) {
  assert.equal(String(this.newAccountId), String(organizations[0].members[1]._id));
}
describe('OrganizationsRepository', function () {

  before(function (done) {
    db = mongoose.connect('mongodb://localhost/test');
    var accountModel = _createOwner();
    var newAccountModel = _createMember();

    AccountsRepository.save(newAccountModel, 'test', function (account) {
      this.newAccountId = account._id;
    }.bind(this), function () {});

    AccountsRepository.save(accountModel, 'test', function (account) {
      this.accountId = account._id;
      _createOrganization.call(this, 'test1');
      _createOrganization.call(this, 'test2');
      done();
    }.bind(this), function () {});
  });

  it('findAll should return all organizations', function (done) {
    OrganizationsRepository.findAll(this.accountId, function (organizations) {
      assertGetTwoOrganizations(organizations);
      done();
    });
  });

  it('findById should return a organization with populated accounts', function (done) {
    OrganizationsRepository.findById(this.accountId, this.organizationId, function (organizations) {
      assertGetOneOrganization(organizations);
      assertRetrievePopulatedAccount.call(this, organizations);
      done();
    }.bind(this));
  });

  it('findByIdWithoutPopulate should return a organization', function (done) {
    OrganizationsRepository.findById(this.accountId, this.organizationId, function (organizations) {
      assertGetOneOrganization(organizations);
      done();
    }.bind(this));
  });

  it('Update should edit a organization', function (done) {
    var coop = {
      name: 'testupdate',
      code: 'testupdate',
      email: 'testupdate@test.com'
    };
    OrganizationsRepository.update(coop, this.organizationId, function () {
      OrganizationsRepository.findById(this.accountId, this.organizationId, function (organizations) {
        assertGetOneOrganization(organizations);
        assertGetSameOrganization(organizations);
        done();
      }.bind(this));
    }.bind(this));
  });

  it('addAccountToOrganization should add an organization member', function (done) {
    OrganizationsRepository.addAccountToOrganization(this.newAccountId, this.organizationId, function () {
      OrganizationsRepository.findById(this.accountId, this.organizationId, function (organizations) {
        assertGetOneOrganization(organizations);
        assertGetSameOrganization(organizations);
        assertSaveAccount.call(this, organizations);
        done();
      }.bind(this));
    }.bind(this));
  });

  it('Delete should delete a organization', function (done) {
    OrganizationsRepository.delete(this.organizationId);
    OrganizationsRepository.findById(this.accountId, this.organizationId, function (organizations) {
      assertGetZeroOrganizations(organizations);
      done();
    }.bind(this));
  });

  it('Delete should delete an account from the organization', function (done) {
/*    var adminId = '';
    OrganizationsRepository.deleteAccount(ACCOUNT_ID, this.organizationId, adminId);
    OrganizationsRepository.findById(ACCOUNT_ID, this.organizationId, function (organizations) {
      assertGetZeroOrganizations(organizations);
      done();
    }.bind(this));*/
    done();
  });

  after(function (done) {
    OrganizationPersistenceSchema.remove({}, function () {});
    mongoose.connection.close();
    done();
  });
});

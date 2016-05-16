var mongoose = require('mongoose');
var OrganizationsRepository = require("../infrastructure/persistence/OrganizationsRepository.js");
var OrganizationPersistenceSchema = require('../infrastructure/persistence/schemas/OrganizationPersistenceSchema.js');
var assert = require('chai').assert;
var db;

const ACCOUNT_ID = '56c9dd2c5606c3b20f86220c';
const NEW_MEMBER_ID = '2229dd2c5606c3b20f86220c';

var createOrganization = function (name) {
  var organization = {
    name: name,
    code: name,
    email: name + '@test.com'
  };
  OrganizationsRepository.save(organization, ACCOUNT_ID, function (organization) {
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

describe('OrganizationsRepository', function () {

  before(function (done) {
    db = mongoose.connect('mongodb://localhost/test');
    createOrganization.call(this, 'test1');
    createOrganization.call(this, 'test2');
    done();
  });

  it('findAll should return all organizations', function (done) {
    OrganizationsRepository.findAll(ACCOUNT_ID, function (organizations) {
      assertGetTwoOrganizations(organizations);
      done();
    });
  });

  it('findById should return a organization with populated accounts', function (done) {
    OrganizationsRepository.findById(ACCOUNT_ID, this.organizationId, function (organizations) {
      assertGetOneOrganization(organizations);
      // TODO: populated members assert.equal(ACCOUNT_ID, organizations[0].members[0]._id);
      done();
    }.bind(this));
  });

  it('findByIdWithoutPopulate should return a organization', function (done) {
    OrganizationsRepository.findById(ACCOUNT_ID, this.organizationId, function (organizations) {
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
      OrganizationsRepository.findById(ACCOUNT_ID, this.organizationId, function (organizations) {
        assertGetOneOrganization(organizations);
        assertGetSameOrganization(organizations);
        done();
      }.bind(this));
    }.bind(this));
  });

  it('addAccountToOrganization should add an organization member', function (done) {
    var coop = {
      name: 'testupdate',
      code: 'testupdate',
      email: 'testupdate@test.com'
    };
    OrganizationsRepository.addAccountToOrganization(NEW_MEMBER_ID, this.organizationId, function () {
      OrganizationsRepository.findById(ACCOUNT_ID, this.organizationId, function (organizations) {
        assertGetOneOrganization(organizations);
        assertGetSameOrganization(organizations);
        //assert.equal(NEW_MEMBER_ID, organizations[0].members[1]); TODO: save account first
        done();
      }.bind(this));
    }.bind(this));
  });

  it('Delete should delete a organization', function (done) {
    OrganizationsRepository.delete(this.organizationId);
    OrganizationsRepository.findById(ACCOUNT_ID, this.organizationId, function (organizations) {
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

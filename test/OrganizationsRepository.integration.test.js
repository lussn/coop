var mongoose = require('mongoose');
var OrganizationsRepository = require("../infrastructure/persistence/OrganizationsRepository.js");
var Organization = require("../domain/organizations/Organization.js");
var assert = require('chai').assert;
var db;

const ACCOUNT_ID = '56c9dd2c5606c3b20f86220c';

var createOrganization = function (name) {
  var organization = new Organization({
    name: name,
    code: name,
    email: name + '@test.com'
  });
  organization.members.push(ACCOUNT_ID);
  OrganizationsRepository.save(organization);
  this.organizationId = organization._id;
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

  after(function (done) {
    Organization.remove({}, function () {
    });
    mongoose.connection.close();
    done();
  });

  it('findAll should return all organizations', function (done) {
    OrganizationsRepository.findAll(ACCOUNT_ID, function (organizations) {
      assertGetTwoOrganizations(organizations);
      done();
    });
  });

  it('findById should return a organization', function (done) {
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

  it('Delete should delete a organization', function (done) {
    OrganizationsRepository.delete(this.organizationId);
    OrganizationsRepository.findById(ACCOUNT_ID, this.organizationId, function (organizations) {
      assertGetZeroOrganizations(organizations);
      done();
    }.bind(this));
  });
});

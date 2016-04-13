var OrganizationPersistenceSchema = require('./schemas/OrganizationPersistenceSchema.js');

var OrganizationsRepository = function OrganizationsRepository() {
  this.findAll = function (accountId, callback) {
    return OrganizationPersistenceSchema.find({members: accountId}).exec(function (err, organizations) {
      callback(organizations);
    });
  },

  this.findById = function (accountId, organizationId, callback) {
    return OrganizationPersistenceSchema.find({_id: organizationId, members: accountId}).exec(function (err, organization) {
      callback(organization);
    });
  },

  this.save = function (coop, accountId, callback) {
    var organization = OrganizationPersistenceSchema.createPersistenceModel(
      coop,
      accountId
    );
    organization.save(function (err, organization) {
      if (callback instanceof Function) { callback(organization); }
    });
  },

  this.update = function (coop, organizationId, callback) {
    OrganizationPersistenceSchema.findOneAndUpdate({_id: organizationId}, coop, {new: true}, callback);
  },

  this.delete = function (organizationId, callback) {
    OrganizationPersistenceSchema.find({_id: organizationId}).remove().exec(function (err, organization) {
      if (callback instanceof Function) { callback(organization); }
    });
  }
};
module.exports = new OrganizationsRepository();

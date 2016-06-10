var OrganizationPersistenceSchema = require('./schemas/OrganizationPersistenceSchema.js');

var _executeCallbackIfSuccess = function (err, organization) {
  var callback = this;
  if (callback instanceof Function) { callback(organization); }
};

var OrganizationsRepository = function OrganizationsRepository() {
  this.findAll = function (ownerId) {
    return OrganizationPersistenceSchema.find({members: ownerId}).exec();
  },

  this.findById = function (ownerId, organizationId) {
    return OrganizationPersistenceSchema.find({_id: organizationId, members: ownerId}).populate('members').exec();
  },

  this.findByIdWithoutPopulate = function (ownerId, organizationId) {
    return OrganizationPersistenceSchema.find({_id: organizationId, members: ownerId}).exec();
  },

  this.save = function (coop, ownerId) {
    var organization = OrganizationPersistenceSchema.createPersistenceModel(
      coop,
      ownerId
    );
    return organization.save();
  },

  this.update = function (coop, organizationId, callback) {
    OrganizationPersistenceSchema.findOneAndUpdate({_id: organizationId}, coop, {new: true}, callback);
  },

  this.addAccountToOrganization = function (accountId, organizationId, callback) {
    OrganizationPersistenceSchema.findOneAndUpdate({_id: organizationId}, {$push: {members: accountId}}, {new: true}, callback);
  },

  this.delete = function (organizationId, callback) {
    OrganizationPersistenceSchema.find({_id: organizationId}).remove().exec(_executeCallbackIfSuccess.bind(callback));
  },

  this.deleteAccountFromOrganization = function (accountId, organizationId, callback) {
    OrganizationPersistenceSchema.findOneAndUpdate({_id: organizationId}, {$pull: {members: accountId}}, {new: true}, callback);
  }
};
module.exports = new OrganizationsRepository();

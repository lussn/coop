var OrganizationPersistenceSchema = require('./schemas/OrganizationPersistenceSchema.js');

var _executeCallbackIfSuccess = function (err, organization) {
  var callback = this;
  if (callback instanceof Function) { callback(organization); }
};

var OrganizationsRepository = function OrganizationsRepository() {
  this.findAll = function (ownerId, callback) {
    return OrganizationPersistenceSchema.find({members: ownerId}).exec(_executeCallbackIfSuccess.bind(callback));
  },

  this.findById = function (ownerId, organizationId, callback) {
    return OrganizationPersistenceSchema.find({_id: organizationId, members: ownerId}).populate('members').exec(
      _executeCallbackIfSuccess.bind(callback)
    );
  },

  this.findByIdWithoutPopulate = function (ownerId, organizationId, callback) {
    return OrganizationPersistenceSchema.find({_id: organizationId, members: ownerId}).exec(
      _executeCallbackIfSuccess.bind(callback)
    );
  },

  this.save = function (coop, ownerId, callback) {
    var organization = OrganizationPersistenceSchema.createPersistenceModel(
      coop,
      ownerId
    );
    organization.save(_executeCallbackIfSuccess.bind(callback));
  },

  this.update = function (coop, organizationId, callback) {
    OrganizationPersistenceSchema.findOneAndUpdate({_id: organizationId}, coop, {new: true}, callback);
  },

  this.addAccountToOrganization = function (accountId, organizationId, callback) {
    OrganizationPersistenceSchema.findOneAndUpdate({_id: organizationId}, {$push: {members: accountId}}, {new: true}, callback);
  },

  this.delete = function (organizationId, callback) {
    OrganizationPersistenceSchema.find({_id: organizationId}).remove().exec(_executeCallbackIfSuccess.bind(callback));
  }
};
module.exports = new OrganizationsRepository();

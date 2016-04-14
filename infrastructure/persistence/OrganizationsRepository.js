var OrganizationPersistenceSchema = require('./schemas/OrganizationPersistenceSchema.js');

var _executeCallbackIfSuccess = function (err, organization) {
  var callback = this;
  if (callback instanceof Function) { callback(organization); }
};

var OrganizationsRepository = function OrganizationsRepository() {
  this.findAll = function (accountId, callback) {
    return OrganizationPersistenceSchema.find({members: accountId}).exec(_executeCallbackIfSuccess.bind(callback));
  },

  this.findById = function (accountId, organizationId, callback) {
    return OrganizationPersistenceSchema.find({_id: organizationId, members: accountId}).populate('members').exec(
      _executeCallbackIfSuccess.bind(callback)
    );
  },

  this.save = function (coop, accountId, callback) {
    var organization = OrganizationPersistenceSchema.createPersistenceModel(
      coop,
      accountId
    );
    organization.save(_executeCallbackIfSuccess.bind(callback));
  },

  this.update = function (coop, organizationId, callback) {
    OrganizationPersistenceSchema.findOneAndUpdate({_id: organizationId}, coop, {new: true}, callback);
  },

  this.delete = function (organizationId, callback) {
    OrganizationPersistenceSchema.find({_id: organizationId}).remove().exec(_executeCallbackIfSuccess.bind(callback));
  }
};
module.exports = new OrganizationsRepository();

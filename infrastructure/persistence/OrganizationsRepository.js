var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Organization = mongoose.model(
  'Organization',
  new Schema({
    name: String,
    code: String,
    email: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}]
  })
);

var OrganizationsRepository = function OrganizationsRepository() {
  this.findAll = function (accountId, callback) {
    return Organization.find({members: accountId}).exec(function (err, organizations) {
      callback(organizations);
    });
  },

  this.findById = function (accountId, organizationId, callback) {
    return Organization.find({_id: organizationId, members: accountId}).exec(function (err, organizations) {
      callback(organizations);
    });
  },

  this.save = function (coop, accountId, callback) {
    var organization = new Organization({
      name: coop.name,
      code: coop.code,
      email: coop.email
    });
    organization.members.push(accountId);
    organization.save();
    if (callback instanceof Function) { callback(organization); }
  },

  this.update = function (coop, organizationId, callback) {
    Organization.findOneAndUpdate({_id: organizationId}, coop, {new: true}, callback);
  },

  this.delete = function (organizationId) {
    Organization.find({_id: organizationId}).remove().exec();
  },

  this.deleteAll = function () {
    Organization.remove({}, function () {
    });
  }
};
module.exports = new OrganizationsRepository();

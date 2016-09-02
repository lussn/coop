var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var OrganizationPersistenceSchema = new Schema({
  name: String,
  code: String,
  email: String,
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}]
});

OrganizationPersistenceSchema.statics.createPersistenceModel = function createPersistenceModel(
  coop,
  accountId
) {
  var organization = new this({
    name: coop.name,
    code: coop.code,
    email: coop.email
  });
  organization.members.push(accountId);
  return organization;
};

module.exports = mongoose.model('Organization', OrganizationPersistenceSchema);

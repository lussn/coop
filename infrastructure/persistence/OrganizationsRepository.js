var Organization = require('../../domain/organizations/Organization');
var OrganizationsRepository = function OrganizationsRepository() {
	this.findAll = function (accountId, callback) {
		return Organization.find({ members: accountId }).exec(function(err, organizations){
			callback(organizations);
		});
	},

	this.findById = function (accountId, organizationId, callback) {
		return Organization.find({ _id: organizationId, members: accountId }).exec(function(err, organizations){
			callback(organizations);
		});
	},

	this.save = function(coop) {
		coop.save();
	},

	this.update = function(coop, organizationId, callback) {
		Organization.findOneAndUpdate({_id: organizationId}, coop, callback);
	},

	this.delete = function(organizationId) {
		Organization.find({ _id: organizationId }).remove().exec();
	}
};
module.exports = new OrganizationsRepository();

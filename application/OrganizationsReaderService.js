var OrganizationsRepository = require('../infrastructure/persistence/OrganizationsRepository');

var OrganizationsReaderService = function OrganizationsReaderService() {
	this.findAll = function (accountId, callback) {
		return OrganizationsRepository.findAll(accountId, callback);
	}

	this.findById = function (accountId, organizationId, callback) {
		return OrganizationsRepository.findById(accountId, organizationId, callback);
	}
};
module.exports = new OrganizationsReaderService();

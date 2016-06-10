var OrganizationsRepository = require('../infrastructure/persistence/OrganizationsRepository');

var OrganizationsReaderService = function OrganizationsReaderService() {
	this.findAll = function (accountId) {
		return OrganizationsRepository.findAll(accountId);
	}

	this.findById = function (accountId, organizationId) {
		return OrganizationsRepository.findById(accountId, organizationId);
	}
};
module.exports = new OrganizationsReaderService();

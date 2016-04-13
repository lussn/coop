var OrganizationsRepository = require('../infrastructure/persistence/OrganizationsRepository');
var ValidatorService = require('../application/ValidatorService');

var _validateOrganizationValues = function (organization) {
    ValidatorService.validateNotBlank(organization.name);
    ValidatorService.validateNotBlank(organization.code);
    ValidatorService.validateEmail(organization.email);
};

var OrganizationRegisterService = function OrganizationRegisterService() {
    this.save = function (organization, accountId, callback) {
        _validateOrganizationValues(organization);
        OrganizationsRepository.save(organization, accountId);
        callback(organization);
    },
    this.update = function (organization, organizationId, callback) {
        _validateOrganizationValues(organization);
        return OrganizationsRepository.update(organization, organizationId, callback);
    },
    this.delete = function (organizationId, callback) {
        return OrganizationsRepository.delete(organizationId, callback);
    }
};
module.exports = new OrganizationRegisterService();

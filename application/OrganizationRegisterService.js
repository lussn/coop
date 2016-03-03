var OrganizationsRepository = require('../infrastructure/persistence/OrganizationsRepository');
var Organization = require('../domain/organizations/Organization');
var ValidatorService = require('../application/ValidatorService');

var _validateOrganizationValues = function (organization) {
    ValidatorService.validateNotBlank(organization.name);
    ValidatorService.validateNotBlank(organization.code);
    ValidatorService.validateEmail(organization.email);
};

var OrganizationRegisterService = function OrganizationRegisterService() {
    this.save = function (organization, accountId, callback) {
        _validateOrganizationValues(organization);
        var coop = new Organization({
            name: organization.name,
            code: organization.code,
            email: organization.email
        });
        coop.members.push(accountId);
        OrganizationsRepository.save(coop);
        callback(coop);
    },
    this.update = function (organization, organizationId, callback) {
        _validateOrganizationValues(organization);
        return OrganizationsRepository.update(organization, organizationId, callback);
    },
    this.delete = function (organizationId) {
        return OrganizationsRepository.delete(organizationId);
    }
};
module.exports = new OrganizationRegisterService();

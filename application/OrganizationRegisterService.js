var OrganizationsRepository = require('../infrastructure/persistence/OrganizationsRepository');
var AccountsRepository = require('../infrastructure/persistence/AccountsRepository');
var ValidatorService = require('../application/ValidatorService');

var _validateOrganizationValues = function (organization) {
    ValidatorService.validateNotBlank(organization.name);
    ValidatorService.validateNotBlank(organization.code);
    ValidatorService.validateEmail(organization.email);
};

var _validateAccountValues = function (account) {
    ValidatorService.validateNotBlank(account.username);
    ValidatorService.validateNotBlank(account.password);
    ValidatorService.validateEmail(account.email);
};

var OrganizationRegisterService = function OrganizationRegisterService() {
    this.save = function (organization, ownerId, callback) {
        _validateOrganizationValues(organization);
        OrganizationsRepository.save(organization, ownerId);
        callback(organization);
    },

    this.saveAccount = function (account, organizationId, ownerId, callback) {
        _validateAccountValues(account);
        delete account._id;
        OrganizationsRepository.findByIdWithoutPopulate(ownerId, organizationId, function (organizations) {
          var organization = organizations[0]; // TODO: solve this properly
          if (String(organization.members[0]) === String(ownerId)) {
            AccountsRepository.save(
              account,
              account.password,
              function (newAccount) {
                OrganizationsRepository.addAccountToOrganization(newAccount._id, organization._id, callback);
              },
              function (msg, err) {
                throw new Error(err);
              }
            )
          }
        });
    },

    this.update = function (organization, organizationId, callback) {
        _validateOrganizationValues(organization);
        return OrganizationsRepository.update(organization, organizationId, callback);
    },

    this.updateAccountFromOrganization = function (account, organizationId, ownerId, callback) {
        _validateAccountValues(account);

        OrganizationsRepository.findByIdWithoutPopulate(account._id, organizationId, function (organizations) {
          var organization = organizations[0]; // TODO: solve this properly
          if (String(organization.members[0]) === String(ownerId)) {
            AccountsRepository.update(
              account._id,
              account,
              callback
            )
          }
        });
    },

    this.delete = function (organizationId, callback) {
        return OrganizationsRepository.delete(organizationId, callback);
    },

    this.deleteAccountFromOrganization = function (accountId, organizationId, ownerId, callback) {
      OrganizationsRepository.findByIdWithoutPopulate(ownerId, organizationId, function (organizations) {
        var organization = organizations[0]; // TODO: solve this properly
        if (String(organization.members[0]) === String(ownerId)) {
          OrganizationsRepository.deleteAccountFromOrganization(accountId, organizationId, callback);
        }
      });
    }
};
module.exports = new OrganizationRegisterService();

var OrganizationsRepository = require('../infrastructure/persistence/OrganizationsRepository');
var AccountsRepository = require('../infrastructure/persistence/AccountsRepository');
var ProductsRepository = require('../infrastructure/persistence/ProductsRepository');
var ValidatorService = require('../application/ValidatorService');
var Promise = require('bluebird');

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
    this.save = function (organization, ownerId) {
        _validateOrganizationValues(organization);
        return OrganizationsRepository.save(organization, ownerId);
    },

    this.saveAccount = function (account, organizationId, ownerId) {
      return new Promise(function(resolve, reject) {
        _validateAccountValues(account);
        var organization = null;
        delete account._id;
        OrganizationsRepository.findByIdWithoutPopulate(ownerId, organizationId)
          .then(function (organizations) {
            organization = organizations[0]; // TODO: solve this properly !! no return?
            if (String(organization.members[0]) === String(ownerId)) {
              return AccountsRepository.save(account, account.password);
            }
          }, reject)
          .then(function (newAccount) {
            OrganizationsRepository.addAccountToOrganization(newAccount._id, organization._id)
              .then(resolve, reject);
          }, reject);
      });
    },

    this.saveProduct = function (product, organizationId, ownerId) {
      return new Promise(function(resolve, reject) {
        var organization = null;
        delete product._id;
        OrganizationsRepository.findByIdWithoutPopulate(ownerId, organizationId)
          .then(function (organizations) {
            organization = organizations[0]; // TODO: solve this properly !! no return?
            if (String(organization.members[0]) === String(ownerId)) {
              return ProductsRepository.save(product);
            }
          }, reject)
          .then(function (product) {
            OrganizationsRepository.addProductToOrganization(product._id, organization._id)
              .then(resolve, reject);
          }, reject);
      });
    },

    this.update = function (organization, organizationId) {
        _validateOrganizationValues(organization);
        return OrganizationsRepository.update(organization, organizationId);
    },

    this.updateAccountFromOrganization = function (account, organizationId, ownerId) {
      return new Promise(function(resolve, reject) {
        _validateAccountValues(account);
        OrganizationsRepository.findByIdWithoutPopulate(account._id, organizationId)
          .then(function (organizations) {
            var organization = organizations[0]; // TODO: solve this properly
            if (String(organization.members[0]) === String(ownerId)) {
              AccountsRepository.update(account._id, account)
                .then(resolve, reject);
            }
          });
      });
    },

    this.delete = function (organizationId) {
        return OrganizationsRepository.delete(organizationId);
    },

    this.deleteAccountFromOrganization = function (accountId, organizationId, ownerId) {
      return new Promise(function(resolve, reject) {
        OrganizationsRepository.findByIdWithoutPopulate(ownerId, organizationId).then(function (organizations) {
          var organization = organizations[0]; // TODO: solve this properly
          if (String(organization.members[0]) === String(ownerId)) {
            OrganizationsRepository.deleteAccountFromOrganization(accountId, organizationId)
              .then(resolve, reject);
          }
        });
      });
    }
};
module.exports = new OrganizationRegisterService();

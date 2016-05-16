import AjaxService from './AjaxService.js'

const organizationUrl = '/api/organizations/';

let _addNewOrganization = function (id, coop) {
  return new Promise(function(resolve, reject) {
    AjaxService.post(organizationUrl, coop, function (status, response) {
      if (status === 200) { resolve() }
    })
  })
}

let _editOrganization = function (id, coop) {
  return new Promise(function(resolve, reject) {
    AjaxService.put(organizationUrl + id, coop, function (status, response) {
      if (status === 200) { resolve() }
    })
  })
}

let OrganizationAjaxService = function OrganizationAjaxService() {
  this.saveOrganization = function (action, coop) {
    let actionCalls = {
      'add': _addNewOrganization,
      'edit': _editOrganization
    }
    return actionCalls[action](coop._id, coop)
  }

  this.getOrganizations = function () {
    return new Promise(function(resolve, reject) {
      AjaxService.get(organizationUrl, function (status, response) {
        if (status === 200) { resolve(JSON.parse(response)) }
      })
    })
  }

  this.getOrganizationById = function (organizationId) {
    return new Promise(function(resolve, reject) {
      AjaxService.get(organizationUrl + organizationId, function (status, response) {
        if (status === 200) { resolve(response) }
      })
    })
  }

  this.deleteOrganization = function (organizationId) {
    return new Promise(function(resolve, reject) {
      AjaxService.delete('/api/organizations/' + organizationId, function (status, response) {
        if (status === 200) { resolve() }
      })
    })
  }

  this.deleteAccountFromOrganization = function (accountId, organizationId, callback) {
    return new Promise(function(resolve, reject) {
      AjaxService.delete('/api/organizations/' + organizationId + '/accounts/' + accountId, function (status, response) {
        if (status === 200) { resolve() }
      })
    })
  }
};
module.exports = new OrganizationAjaxService();

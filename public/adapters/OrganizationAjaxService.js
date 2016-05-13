import AjaxService from './AjaxService.js'

const organizationUrl = '/api/organizations/';

function _executeCallbackIfSuccess(status, response, callback) {
  if (status === 200 && callback) { callback(response) }
}

let _addNewOrganization = function (id, coop, callback) {
  AjaxService.post(organizationUrl, coop, function (status, response) {
    _executeCallbackIfSuccess(status, response, callback)
  })
}

let _editOrganization = function (id, coop, callback) {
  AjaxService.put(organizationUrl + id, coop, function (status, response) {
    _executeCallbackIfSuccess(status, response, callback)
  })
}

let OrganizationAjaxService = function OrganizationAjaxService() {
  this.saveOrganization = function (action, coop, callback) {
    let actionCalls = {
      'add': _addNewOrganization,
      'edit': _editOrganization
    }
    actionCalls[action](coop.id, coop, callback)
  }

  this.getOrganizations = function () {
    return new Promise(function(resolve, reject) {
      AjaxService.get('/api/organizations', function (status, response) {
        if (status === 200) { resolve(JSON.parse(response)) }
      })
    })
  }

  this.getOrganizationById = function (organizationId, callback) {
    AjaxService.get('/api/organizations/' + organizationId, function (status, response) {
      _executeCallbackIfSuccess(status, response, callback)
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
    AjaxService.delete('/api/organizations/' + organizationId + '/accounts/' + accountId, function (status, response) {
      _executeCallbackIfSuccess(status, response, callback)
    })
  }
};
module.exports = new OrganizationAjaxService();

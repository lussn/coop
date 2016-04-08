import AjaxService from './AjaxService.js'

const organizationUrl = '/api/organizations/';


function _executeCallbackIfSuccess(status, response, callback) {
  if (status === 200) { callback(response) }
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

  this.getOrganizations = function (callback) {
    AjaxService.get('/api/organizations', function(status, response) {
      _executeCallbackIfSuccess(status, response, callback);
    })
  }

  this.deleteOrganization = function (organizationId, callback) {
    AjaxService.delete('/api/organizations/' + organizationId, function (status, response) {
      _executeCallbackIfSuccess(status, response, callback)
    })
  }
};
module.exports = new OrganizationAjaxService();

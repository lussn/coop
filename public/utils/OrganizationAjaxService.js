import AjaxService from './../utils/AjaxService.js'

const organizationUrl = '/api/organizations/';

let _addNewOrganization = function (id, coop, callback) {
  AjaxService.post(organizationUrl, coop, function (status) {
    if (status === 200) { callback() }
  }.bind(this))
}

let _editOrganization = function (id, coop, callback) {
  AjaxService.put(organizationUrl + id, coop, function (status) {
    if (status === 200) { callback() }
  }.bind(this))
}

let OrganizationAjaxService = function OrganizationAjaxService() {
  this.saveOrganization = function (action, coop, callback) {
    let actionCalls = {
      'add': _addNewOrganization,
      'edit': _editOrganization
    }
    actionCalls[action](coop.id, coop, callback)
  }
};
module.exports = new OrganizationAjaxService();

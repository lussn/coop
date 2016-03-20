import AjaxService from './../utils/AjaxService.js'

const organizationUrl = '/api/organizations/';

let _addNewOrganization = function (id, coop) {
  AjaxService.post(organizationUrl, coop, function (status) {
    if (status === 200) {
      this.props.close()
      this.props.updateFunction()
    }
  }.bind(this))
}

let _editOrganization = function (id, coop) {
  AjaxService.put(organizationUrl + id, coop, function (status) {
    if (status === 200) {
      this.props.close() // TODO: Move to callback
      this.props.updateFunction()
    }
  }.bind(this))
}

let OrganizationAjaxService = function OrganizationAjaxService() {
  this.saveOrganization = function (action, id, coop) {
    let actionCalls = {
      'add': _addNewOrganization,
      'edit': _editOrganization
    }
    actionCalls[action].call(this, coop)
  }
};
module.exports = new OrganizationAjaxService();

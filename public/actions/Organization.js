import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'

function _deleteOrganizationAction(organizationId) {
  return { type: 'DELETE', organizationId }
}

function _getOrganizationsAction(organizations) {
  return { type: 'GET', organizations }
}

export function deleteOrganization(organizationId) {
  return function (dispatch) {
    return OrganizationAjaxService.deleteOrganization(organizationId).then(
      function () {
        dispatch(_deleteOrganizationAction(organizationId))
      }
    )
  }
}

export function getOrganizations() {
  return function (dispatch) {
    return OrganizationAjaxService.getOrganizations().then(
      function (organizations) {
        dispatch(_getOrganizationsAction(organizations))
      }
    )
  }
}

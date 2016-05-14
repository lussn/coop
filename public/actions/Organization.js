import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'

function _deleteOrganizationAction (organizationId) {
  return { type: 'DELETE', organizationId: organizationId }
}

function _getOrganizationsAction (organizations) {
  return { type: 'GET', organizations: organizations }
}

export function openEditOrganization (current) {
  return { type: 'OPEN_EDIT', current: current, showModal: true }
}

export function openAddOrganization () {
  return { type: 'OPEN_ADD', showModal: true }
}

export function closeModal () {
  return { type: 'CLOSE_MODAL', showModal: false }
}

export function updateOrganizationForm (current) {
  return { type: 'UPDATE_ORGANIZATION_FORM', current: current }
}

export function deleteOrganization (organizationId) {
  return function (dispatch) {
    return OrganizationAjaxService.deleteOrganization(organizationId).then(
      function () {
        dispatch(_deleteOrganizationAction(organizationId))
      }
    )
  }
}

export function getOrganizations () {
  return function (dispatch) {
    return OrganizationAjaxService.getOrganizations().then(
      function (organizations) {
        dispatch(_getOrganizationsAction(organizations))
      }
    )
  }
}

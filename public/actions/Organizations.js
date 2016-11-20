import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'
import ModalService from './../components/utils/ModalService.js'

function _deleteOrganizationAction (organizationId) {
  return { type: 'DELETE', organizationId: organizationId }
}

function _getOrganizationsAction (organizations, user) {
  return { type: 'GET', organizations: organizations, account: user }
}

function _saveOrganizationAction (organizations) {
  return { type: 'SAVE_ORGANIZATION', organizations: organizations }
}

export function openEditOrganization (current) {
  return { type: 'OPEN_EDIT', current: current, showModal: ModalService.getOrganizationModalKey() }
}

function _saveOrganizationErrorAction (errorMessage) {
  return { type: 'SAVE_ORGANIZATION_ERROR', errorMessage: errorMessage }
}

export function openAddOrganization () {
  return { type: 'OPEN_ADD', showModal: ModalService.getOrganizationModalKey() }
}

export function closeModal () {
  return { type: 'CLOSE_MODAL', showModal: null }
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

export function saveOrganization (action, organization) {
  return function (dispatch) {
    return OrganizationAjaxService.saveOrganization(action, organization).then(
      function () {
        OrganizationAjaxService.getOrganizations().then(
          function (organizations) {
            dispatch(_saveOrganizationAction(organizations))
          }
        )
      },
      function (response) {
        var errorMessage = JSON.parse(response)['message'];
        dispatch(_saveOrganizationErrorAction(errorMessage));
      }
    )
  }
}

export function getOrganizations () {
  return function (dispatch) {
    return OrganizationAjaxService.getOrganizations().then(
      function (organizations) {
        dispatch(_getOrganizationsAction(organizations.value, organizations.user))
      }
    )
  }
}

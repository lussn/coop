import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'

function _getMembersFromOrganizationsArray(organization) {
  return organization.members;
}

function _getOrganizationAction (organization) {
  return { type: 'GET_ORGANIZATION', organization: organization }
}

function _saveAccountErrorAction (errorMessage) {
  return { type: 'SAVE_ACCOUNT_ERROR', errorMessage: errorMessage }
}

export function openEditAccount (current) {
  return { type: 'OPEN_EDIT_ACCOUNT', current: current, showModal: true }
}

export function openAddAccount () {
  return { type: 'OPEN_ADD_ACCOUNT', showModal: true }
}

export function updateAccountForm (current) {
  return { type: 'UPDATE_ACCOUNT_FORM', current: current }
}

export function closeModal () {
  return { type: 'CLOSE_MODAL', showModal: false }
}

export function saveOrganizationAccount (action, organizationId, account) {
  return function (dispatch) {
    return OrganizationAjaxService.saveOrganizationAccount(action, organizationId, account).then(
      function () {
        return OrganizationAjaxService.getOrganizationById(organizationId).then(
          function (returnedOrganization) {
            var organization = JSON.parse(returnedOrganization)[0];
            dispatch(_getOrganizationAction(organization))
          }
        )
      },
      function (response) {
        var errorMessage = JSON.parse(response)['message'];
        dispatch(_saveAccountErrorAction(errorMessage));
      }
    )
  }
}

export function deleteAccountFromOrganization (accountId, organizationId) {
  return function (dispatch) {
    return OrganizationAjaxService.deleteAccountFromOrganization(accountId, organizationId).then(
      function (returnedOrganization) {
        var organization = JSON.parse(returnedOrganization);
        console.log(returnedOrganization)
        dispatch(_getOrganizationAction(organization))
      }
    )
  }
}

export function getOrganization (organizationId) {
  return function (dispatch) {
    return OrganizationAjaxService.getOrganizationById(organizationId).then(
      function (returnedOrganization) {
        var organization = JSON.parse(returnedOrganization)[0];
        dispatch(_getOrganizationAction(organization))
      }
    )
  }
}

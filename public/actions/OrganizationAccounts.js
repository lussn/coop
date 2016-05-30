import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'

function _getMembersFromOrganizationsArray(organization) {
  return organization.members;
}

function _deleteAccountAction (accountId) {
  return { type: 'DELETE_ACCOUNT', accountId: accountId }
}

function _getAccountsAction (accounts, organization) {
  return { type: 'GET_ACCOUNTS', accounts: accounts, organization: organization }
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

export function deleteAccountFromOrganization (accountId, organizationId) {
  return function (dispatch) {
    return OrganizationAjaxService.deleteAccountFromOrganization(accountId, organizationId).then(
      function () {
        dispatch(_deleteAccountAction(accountId))
      }
    )
  }
}

export function getAccountsFromOrganization (organizationId) {
  return function (dispatch) {
    return OrganizationAjaxService.getOrganizationById(organizationId).then(
      function (returnedOrganization) {
        var organization = JSON.parse(returnedOrganization)[0];
        dispatch(_getAccountsAction(_getMembersFromOrganizationsArray(organization), organization))
      }
    )
  }
}

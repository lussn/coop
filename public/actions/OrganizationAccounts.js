import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'

function _getMembersFromOrganizationsArray(organization) {
  return JSON.parse(organization)[0].members;
}

function _deleteAccountAction (accountId) {
  return { type: 'DELETE_ACCOUNT', accountId: accountId }
}

function _getAccountsAction (accounts) {
  return { type: 'GET_ACCOUNTS', accounts: accounts }
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
      function (organization) {
        dispatch(_getAccountsAction(_getMembersFromOrganizationsArray(organization)))
      }
    )
  }
}

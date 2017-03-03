import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'
import ModalService from './../components/utils/ModalService.js'

function _getOrganizationAction (organization, user) {
  return { type: 'GET_ORGANIZATION', organization: organization, account: user }
}

function _saveAccountErrorAction (errorMessage) {
  return { type: 'SAVE_ACCOUNT_ERROR', errorMessage: errorMessage }
}

export function openEditAccount (current) {
  return { type: 'OPEN_EDIT_ACCOUNT', current: current, showModal: ModalService.getAccountModalKey() }
}

export function openEditProduct (current) {
  let mode = (current && current._id) ? 'edit' : 'add'
  return { type: 'OPEN_EDIT_PRODUCT', current: current, showModal: ModalService.getProductModalKey(), mode: mode }
}

export function openAddAccount () {
  return { type: 'OPEN_ADD_ACCOUNT', showModal: ModalService.getAccountModalKey() }
}

export function updateAccountForm (current) {
  return { type: 'UPDATE_ACCOUNT_FORM', current: current }
}

export function closeModal () {
  return { type: 'CLOSE_MODAL', showModal: null }
}

export function saveOrganizationAccount (action, organizationId, account) {
  return function (dispatch) {
    return OrganizationAjaxService.saveOrganizationAccount(action, organizationId, account).then(
      function () {
        return OrganizationAjaxService.getOrganizationById(organizationId).then(
          function (returnedOrganization) {
            var organization = returnedOrganization.value[0]
            dispatch(_getOrganizationAction(organization, returnedOrganization.user))
          }
        )
      },
      function (response) {
        var errorMessage = JSON.parse(response)['message']
        dispatch(_saveAccountErrorAction(errorMessage))
      }
    )
  }
}

export function saveOrganizationProduct (action, organizationId, product) {
  return function (dispatch) {
    return OrganizationAjaxService.saveOrganizationProduct(action, organizationId, product).then(
      function () {
        return OrganizationAjaxService.getOrganizationById(organizationId).then(
          function (returnedOrganization) {
            var organization = returnedOrganization.value[0]
            dispatch(_getOrganizationAction(organization, returnedOrganization.user))
          }
        )
      },
      function (response) {
        var errorMessage = JSON.parse(response)['message']
        dispatch(_saveAccountErrorAction(errorMessage)) // TODO: update this
      }
    )
  }
}

export function orderProduct (productId, organizationId) {
  return function (dispatch) {
    return OrganizationAjaxService.orderProduct(productId).then(
      function () {
        return OrganizationAjaxService.getOrganizationById(organizationId).then( // TODO: Change to account
          function (returnedOrganization) {
            var organization = returnedOrganization.value[0]
            dispatch(_getOrganizationAction(organization, returnedOrganization.user))
          }
        )
      },
      function (response) {
        dispatch(closeModal()) // TODO: update this
      }
    )
  }
}

export function cancelOrder (productId, organizationId) {
  return function (dispatch) {
    return OrganizationAjaxService.cancelOrder(productId).then(
      function () {
        return OrganizationAjaxService.getOrganizationById(organizationId).then( // TODO: Change to account
          function (returnedOrganization) {
            var organization = returnedOrganization.value[0]
            dispatch(_getOrganizationAction(organization, returnedOrganization.user))
          }
        )
      }
    )
  }
}

export function deleteAccountFromOrganization (accountId, organizationId) {
  return function (dispatch) {
    return OrganizationAjaxService.deleteAccountFromOrganization(accountId, organizationId).then(
      function (returnedOrganization) {
        dispatch(_getOrganizationAction(returnedOrganization.value, returnedOrganization.user))
      }
    )
  }
}

export function getOrganization (organizationId) {
  return function (dispatch) {
    return OrganizationAjaxService.getOrganizationById(organizationId).then(
      function (returnedOrganization) {
        var organization = returnedOrganization.value[0]
        dispatch(_getOrganizationAction(organization, returnedOrganization.user))
      }
    )
  }
}

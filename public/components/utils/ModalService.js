var ModalService = function ModalService() {
  const ACCOUNT = 'account'
  const ORGANIZATION = 'organization'
  const PRODUCT = 'product'

  this.getAccountModalKey = function () {
    return ACCOUNT
  }

  this.getOrganizationModalKey = function () {
    return ORGANIZATION
  }

  this.getProductModalKey = function () {
    return PRODUCT
  }

  this.shouldOpenAccountModal = function (value) {
    return value === ACCOUNT
  }

  this.shouldOpenOrganizationModal = function (value) {
    return value === ORGANIZATION
  }

  this.shouldOpenProductModal = function (value) {
    return value === PRODUCT
  }
}
module.exports = new ModalService()

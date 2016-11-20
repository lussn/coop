import AjaxService from './AjaxService.js'

const organizationUrl = '/api/organizations/';
const orderUrl = '/api/orders/';

let _addNewOrganization = function (id, coop) {
  return new Promise(function(resolve, reject) {
    AjaxService.post(organizationUrl, coop, function (status) {
      if (status === 200) { resolve() }
      else { reject() }
    })
  })
}

let _editOrganization = function (id, coop) {
  return new Promise(function(resolve, reject) {
    AjaxService.put(organizationUrl + id, coop, function (status) {
      if (status === 200) { resolve() }
      else { reject() }
    })
  })
}

let _addNewOrganizationAccount = function (organizationId, account) {
  return new Promise(function(resolve, reject) {
    AjaxService.post(organizationUrl + organizationId + '/accounts/' , account, function (status, response) {
      if (status === 200) { resolve() }
      else { reject(response.value) }
    })
  })
}

let _editOrganizationAccount = function (organizationId, account) {
  return new Promise(function(resolve, reject) {
    AjaxService.put(organizationUrl + organizationId + '/accounts/' + account._id, account, function (status, response) {
      if (status === 200) { resolve() }
      else { reject(response.value) }
    })
  })
}

let _addNewOrganizationProduct = function (organizationId, product) {
  return new Promise(function(resolve, reject) {
    AjaxService.post(organizationUrl + organizationId + '/products/' , product, function (status, response) {
      if (status === 200) { resolve() }
      else { reject(response.value) }
    })
  })
}

let _editOrganizationProduct = function (organizationId, product) {
  return new Promise(function(resolve, reject) {
    AjaxService.put(organizationUrl + organizationId + '/products/' + product._id, product, function (status, response) {
      if (status === 200) { resolve() }
      else { reject(response.value) }
    })
  })
}

let OrganizationAjaxService = function OrganizationAjaxService() {
  this.saveOrganization = function (action, coop) {
    let actionCalls = {
      'add': _addNewOrganization,
      'edit': _editOrganization
    }
    return actionCalls[action](coop._id, coop)
  }

  this.saveOrganizationAccount = function (action, organizationId, account) {
    let actionCalls = {
      'add': _addNewOrganizationAccount,
      'edit': _editOrganizationAccount
    }
    return actionCalls[action](organizationId, account)
  }

  this.saveOrganizationProduct = function (action, organizationId, product) {
    let actionCalls = {
      'add': _addNewOrganizationProduct,
      'edit': _editOrganizationProduct
    }
    return actionCalls[action](organizationId, product)
  }

  this.orderProduct = function (productId) {
    return new Promise(function(resolve, reject) {
      AjaxService.post(orderUrl, {productId: productId}, function (status, response) {
        if (status === 200) { resolve() }
        else { reject(response.value) }
      })
    })
  }

  this.getOrganizations = function () {
    return new Promise(function(resolve, reject) {
      AjaxService.get(organizationUrl, function (status, response) {
        if (status === 200) {
          resolve(JSON.parse(response))
        } else { reject() }
      })
    })
  }

  this.getOrganizationById = function (organizationId) {
    return new Promise(function(resolve, reject) {
      AjaxService.get(organizationUrl + organizationId, function (status, response) {
        if (status === 200) {
          resolve(JSON.parse(response))
        } else { reject() }
      })
    })
  }

  this.deleteOrganization = function (organizationId) {
    return new Promise(function(resolve, reject) {
      AjaxService.delete('/api/organizations/' + organizationId, function (status) {
        if (status === 200) { resolve() }
        else { reject() }
      })
    })
  }

  this.deleteAccountFromOrganization = function (accountId, organizationId) {
    return new Promise(function(resolve, reject) {
      AjaxService.delete('/api/organizations/' + organizationId + '/accounts/' + accountId, function (status, response) {
        if (status === 200) { resolve(JSON.parse(response)) }
        else { reject() }
      })
    })
  }
};
module.exports = new OrganizationAjaxService();

import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'
const initialState = [
  { _id: '', name: '', code: '', email: '', members: [] }
]

export default function organizations(state = initialState, action) {
  const deleteOrganization = function (organizationId) {
    OrganizationAjaxService.deleteOrganization(
      organizationId
    )
  }
/*
  this.getOrganizations = function () {
    OrganizationAjaxService.getOrganizations(function (organizations) {
      this.setState({
        items: JSON.parse(organizations),
        action: 'add'
      })
    }.bind(this))
  }*/

  switch (action.type) {
    case 'DELETE':
      deleteOrganization(action.organizationId)
      return state.filter(organization =>
        organization._id !== action.organizationId
      )
    case 'GET':
      return action.organizations
    default:
      return state
  }
}

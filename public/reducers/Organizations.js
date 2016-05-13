import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'
const initialState = [
  { _id: '', name: '', code: '', email: '', members: [] }
]

export default function organizations(state = initialState, action) {
  /*this.deleteOrganization = function (organization) {
    OrganizationAjaxService.deleteOrganization(
      organization._id,
      state.filter(organization =>
        organization._id !== action.id
      )
    )
  }

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
      return state.filter(organization =>
        organization._id !== action.organizationId
      )
    case 'GET':
      return action.organizations
    default:
      return state
  }
}

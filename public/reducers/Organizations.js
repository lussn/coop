import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'

const initialState = [
  { _id: '', name: '', code: '', email: '', members: [] }
]

export default function organizations(state = initialState, action) {
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

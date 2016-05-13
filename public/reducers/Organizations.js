import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'

const initialState = {
  organizations: [
    { _id: '', name: '', code: '', email: '', members: [] }
  ],
  current: { _id: '', name: '', code: '', email: '', members: [] },
  action: 'add'
}

export default function organizations(state = initialState, action = {}) {
  switch (action.type) {
    case 'DELETE':
      return {
        organizations: state.organizations.filter(organization =>
          organization._id !== action.organizationId
        ),
        current: { _id: '', name: '', code: '', email: '', members: [] },
        action: 'add'
      }
    case 'GET':
      return {
        organizations: action.organizations,
        current: { _id: '', name: '', code: '', email: '', members: [] },
        action: 'add'
      }
    case 'EDIT':
      return {
        organizations: state.organizations,
        current: action.current,
        action: 'edit'
      }
    default:
      return state
  }
}

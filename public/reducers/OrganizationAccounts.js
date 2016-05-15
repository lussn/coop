/*const initialState = {
  accounts: [
    { _id: '', name: '', code: '', email: '', members: [] }
  ],
  current: { _id: '', name: '', code: '', email: '', members: [] },
  action: 'add',
  showModal: false,
  organization: { _id: '', name: '', code: '', email: '', members: [] }
}

export default function organizationAccounts(state = initialState, action = {}) {
  switch (action.type) {
    case 'DELETE':
      return {
        organizations: state.organizations.filter(organization =>
          organization._id !== action.organizationId
        ),
        current: state.current,
        action: 'add'
      }
    case 'GET':
      return {
        organizations: action.organizations,
        current: { _id: '', name: '', code: '', email: '', members: [] },
        action: 'add'
      }
    default:
      return state
  }
}
*/

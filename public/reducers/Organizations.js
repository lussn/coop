const initialState = {
  organizations: [
    { _id: '', name: '', code: '', email: '', members: [] }
  ],
  current: { _id: '', name: '', code: '', email: '', members: [] },
  action: 'add',
  showModal: false
}

export default function organizations(state = initialState, action = {}) {
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
    case 'OPEN_EDIT':
      return {
        organizations: state.organizations,
        current: action.current,
        showModal: action.showModal,
        action: 'edit'
      }
    case 'OPEN_ADD':
      return {
        organizations: state.organizations,
        current: { _id: '', name: '', code: '', email: '', members: [] },
        showModal: action.showModal,
        action: 'add'
      }
    case 'CLOSE_MODAL':
      return {
        organizations: state.organizations,
        current: state.current,
        showModal: action.showModal,
        action: state.action
      }
    case 'SAVE_ORGANIZATION':
      return {
        organizations: action.organizations,
        current: { _id: '', name: '', code: '', email: '', members: [] },
        showModal: false,
        action: 'add'
      }
    default:
      return state
  }
}

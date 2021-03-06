const initialState = {
  organizations: [
    { _id: '', name: '', code: '', email: '', members: [], products: [] }
  ],
  current: { _id: '', name: '', code: '', email: '', members: [], products: [] },
  action: 'add',
  showModal: false,
  errorMessage: null,
  account: { _id: '', username: '', password: '', email: '', orders: [] }
}

export default function organizations(state = initialState, action = {}) {
  switch (action.type) {
    case 'DELETE':
      return {
        organizations: state.organizations.filter(organization =>
          organization._id !== action.organizationId
        ),
        current: state.current,
        action: 'add',
        errorMessage: null,
        account: state.account
      }
    case 'GET':
      return {
        organizations: action.organizations,
        current: { _id: '', name: '', code: '', email: '', members: [], products: [] },
        action: 'add',
        errorMessage: null,
        account: action.account
      }
    case 'OPEN_EDIT':
      return {
        organizations: state.organizations,
        current: action.current,
        showModal: action.showModal,
        action: 'edit',
        errorMessage: null,
        account: state.account
      }
    case 'OPEN_ADD':
      return {
        organizations: state.organizations,
        current: { _id: '', name: '', code: '', email: '', members: [], products: [] },
        showModal: action.showModal,
        action: 'add',
        errorMessage: null,
        account: state.account
      }
    case 'CLOSE_MODAL':
      return {
        organizations: state.organizations,
        current: state.current,
        showModal: action.showModal,
        action: state.action,
        errorMessage: null,
        account: state.account
      }
    case 'SAVE_ORGANIZATION':
      return {
        organizations: action.organizations,
        current: { _id: '', name: '', code: '', email: '', members: [], products: [] },
        showModal: false,
        action: 'add',
        errorMessage: null,
        account: action.account
      }
    case 'SAVE_ORGANIZATION_ERROR':
      return {
        organizations: state.organizations,
        current: state.current,
        showModal: state.showModal,
        action: state.action,
        errorMessage: action.errorMessage,
        account: state.account
      }
    default:
      return state
  }
}

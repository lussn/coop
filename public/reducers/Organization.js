const initialState = {
  current: {},
  organization: { _id: '', name: '', code: '', email: '', members: [], products: [] },
  showModal: false,
  action: 'add',
  errorMessage: null
}

export default function organization(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_ORGANIZATION':
      return {
        current: { _id: '', username: '', password: '', email: '' },
        action: 'add',
        organization: action.organization,
        errorMessage: null
      }
    case 'OPEN_EDIT_ACCOUNT':
      return {
        current: action.current,
        showModal: action.showModal,
        action: 'edit',
        organization: state.organization,
        errorMessage: null
      }
    case 'OPEN_EDIT_PRODUCT':
      return {
        current: action.current,
        showModal: action.showModal,
        action: action.mode,
        organization: state.organization,
        errorMessage: null
      }
    case 'OPEN_ADD_ACCOUNT':
      return {
        current: { _id: '', username: '', password: '', email: '' },
        showModal: action.showModal,
        action: 'add',
        organization: state.organization,
        errorMessage: null
      }
    case 'UPDATE_ACCOUNT_FORM':
      return {
        current: action.current,
        showModal: state.showModal,
        action: state.action,
        organization: state.organization,
        errorMessage: null
      }
    case 'CLOSE_MODAL':
      return {
        current: state.current,
        showModal: action.showModal,
        action: state.action,
        organization: state.organization,
        errorMessage: null
      }
    case 'SAVE_ACCOUNT_ERROR':
      return {
        current: state.current,
        showModal: state.showModal,
        action: state.action,
        organization: state.organization,
        errorMessage: action.errorMessage
      }
    default:
      return state
  }
}

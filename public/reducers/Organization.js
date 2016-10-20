const initialState = {
  accounts: [
    { _id: '', username: '', password: '', email: '' }
  ],
  products: [
    { _id: '', name: '', price: '', description: '', deliver_at: '' }
  ],
  current: {},
  organization: { _id: '', name: '', code: '', email: '', members: [] },
  showModal: false,
  action: 'add',
  errorMessage: null
}

export default function organization(state = initialState, action = {}) {
  switch (action.type) {
    case 'DELETE_ACCOUNT':
      return {
        accounts: state.accounts.filter(account =>
          account._id !== action.accountId
        ),
        current: state.current,
        action: 'add',
        organization: state.organization,
        errorMessage: null
      }
    case 'GET_ACCOUNTS':
      return {
        accounts: action.accounts,
        current: { _id: '', username: '', password: '', email: '' },
        action: 'add',
        organization: action.organization,
        errorMessage: null
      }
    case 'OPEN_EDIT_ACCOUNT':
      return {
        accounts: state.accounts,
        current: action.current,
        showModal: action.showModal,
        action: 'edit',
        organization: state.organization,
        errorMessage: null
      }
    case 'OPEN_ADD_ACCOUNT':
      return {
        accounts: state.accounts,
        current: { _id: '', username: '', password: '', email: '' },
        showModal: action.showModal,
        action: 'add',
        organization: state.organization,
        errorMessage: null
      }
    case 'UPDATE_ACCOUNT_FORM':
      return {
        accounts: state.accounts,
        current: action.current,
        showModal: state.showModal,
        action: state.action,
        organization: state.organization,
        errorMessage: null
      }
    case 'CLOSE_MODAL':
      return {
        accounts: state.accounts,
        current: state.current,
        showModal: action.showModal,
        action: state.action,
        organization: state.organization,
        errorMessage: null
      }
    case 'SAVE_ACCOUNT_ERROR':
      return {
        accounts: state.accounts,
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

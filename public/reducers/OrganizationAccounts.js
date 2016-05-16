const initialState = {
  accounts: [
    { _id: '', username: '', password: '', email: '' }
  ],
  current: { _id: '', username: '', password: '', email: '' },
  showModal: false,
  action: 'add'
}

export default function organizationAccounts(state = initialState, action = {}) {
  switch (action.type) {
    case 'DELETE_ACCOUNT':
      return {
        accounts: state.accounts.filter(account =>
          account._id !== action.accountId
        ),
        current: state.current,
        action: 'add'
      }
    case 'GET_ACCOUNTS':
      return {
        accounts: action.accounts,
        current: { _id: '', username: '', password: '', email: '' },
        action: 'add'
      }
    case 'OPEN_EDIT_ACCOUNT':
      return {
        accounts: state.accounts,
        current: action.current,
        showModal: action.showModal,
        action: 'edit'
      }
    case 'OPEN_ADD_ACCOUNT':
      return {
        accounts: state.accounts,
        current: { _id: '', username: '', password: '', email: '' },
        showModal: action.showModal,
        action: 'add'
      }
    case 'UPDATE_ACCOUNT_FORM':
      return {
        accounts: state.accounts,
        current: action.current,
        showModal: state.showModal,
        action: state.action
      }
    case 'CLOSE_MODAL':
      return {
        accounts: state.accounts,
        current: state.current,
        showModal: action.showModal,
        action: state.action
      }
    default:
      return state
  }
}

const initialState = {
  accounts: [
    { _id: '', username: '', password: '', email: '' }
  ],
  current: { _id: '', username: '', password: '', email: '' },
  organization: { _id: '', name: '', code: '', email: '', members: [] },
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
        action: 'add',
        organization: state.organization
      }
    case 'GET_ACCOUNTS':
      return {
        accounts: action.accounts,
        current: { _id: '', username: '', password: '', email: '' },
        action: 'add',
        organization: action.organization
      }
    case 'OPEN_EDIT_ACCOUNT':
      return {
        accounts: state.accounts,
        current: action.current,
        showModal: action.showModal,
        action: 'edit',
        organization: state.organization
      }
    case 'OPEN_ADD_ACCOUNT':
      return {
        accounts: state.accounts,
        current: { _id: '', username: '', password: '', email: '' },
        showModal: action.showModal,
        action: 'add',
        organization: state.organization
      }
    case 'UPDATE_ACCOUNT_FORM':
      return {
        accounts: state.accounts,
        current: action.current,
        showModal: state.showModal,
        action: state.action,
        organization: state.organization
      }
    case 'CLOSE_MODAL':
      return {
        accounts: state.accounts,
        current: state.current,
        showModal: action.showModal,
        action: state.action,
        organization: state.organization
      }
    default:
      return state
  }
}

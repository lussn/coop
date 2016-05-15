const initialState = {
  accounts: [
    { _id: '', username: '', password: '', email: '' }
  ],
  current: { _id: '', username: '', password: '', email: '' },
  action: 'add',
  showModal: false
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
      }
    case 'GET_ACCOUNTS':
      return {
        accounts: action.accounts,
        current: { _id: '', username: '', password: '', email: '' },
        action: 'add'
      }
    default:
      return state
  }
}

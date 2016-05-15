const initialState = {
  accounts: [
    { _id: '', username: '', password: '', email: '' }
  ],
  current: { _id: '', username: '', password: '', email: '' },
  action: 'add',
  showModal: false,
  organization: { _id: '', name: '', code: '', email: '', members: [] }
}

export default function organizationAccounts(state = initialState, action = {}) {
  switch (action.type) {
    case 'DELETE':
      return {
        accounts: state.accounts.filter(account =>
          account._id !== action.accountId
        ),
        current: state.current,
        action: 'add'
      }
    case 'GET':
      return {
        accounts: action.accounts,
        current: { _id: '', username: '', password: '', email: '' },
        action: 'add'
      }
    default:
      return state
  }
}

const initialState = {
  page: 'organizations',
  organization: null
}

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return {
        page: action.page,
        organization: action.organization
      }
    default:
      return state
  }
}

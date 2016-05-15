import { combineReducers } from 'redux'
import organizations from './Organizations.js'
import organizationAccounts from './OrganizationAccounts.js'

export default combineReducers({
  organizations,
  organizationAccounts
})

import { combineReducers } from 'redux'
import organizations from './Organizations.js'
import organizationAccounts from './OrganizationAccounts.js'
import app from './App.js'

export default combineReducers({
  app,
  organizations,
  organizationAccounts
})

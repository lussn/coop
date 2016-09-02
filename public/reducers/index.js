import { combineReducers } from 'redux'
import organizations from './Organizations.js'
import organizationAccounts from './OrganizationAccounts.js'
import { routerReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  organizations,
  organizationAccounts,
  routing: routerReducer,
  form: formReducer
})

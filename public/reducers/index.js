import { combineReducers } from 'redux'
import organizations from './Organizations.js'
import organization from './Organization.js'
import { routerReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

export default combineReducers({
  organizations,
  organization,
  routing: routerReducer,
  form: formReducer
})

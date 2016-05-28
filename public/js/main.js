import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import OrganizationsTable from './OrganizationsTable.jsx'
import MembersTable from './MembersTable.jsx'
import { Provider } from 'react-redux'
import reducers from './../reducers'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as AppActions from './../actions/App.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const store = applyMiddleware(thunk)(createStore)(combineReducers({
  reducers,
  routing: routerReducer
}))
const history = syncHistoryWithStore(browserHistory, store)

class App extends Component {

  render () {
    return <Router history={history}>
              <Route path='/' component={OrganizationsTable}>
                <Route path=':id/members' component={MembersTable}/>
              </Route>
            </Router>
  }
}

function mapStateToProps(state) {
  return {
    page: state.reducers.app.page,
    organization: state.reducers.app.organization
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  }
}

let MainApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

ReactDOM.render(
  <Provider store={store}>
    <MainApp />
  </Provider>,
  document.getElementById('main')
)

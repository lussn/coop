import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import OrganizationsTable from './OrganizationsTable.jsx'
import MembersTable from './MembersTable.jsx'
import { Provider } from 'react-redux'
import reducers from './../reducers'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const store = applyMiddleware(thunk)(createStore)(reducers)
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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
)

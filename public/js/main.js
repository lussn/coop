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
    return <div>{this.props.children}</div>
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={OrganizationsTable}/>
      <Route path='/:id/members' component={MembersTable}/>
    </Router>
  </Provider>,
  document.getElementById('main')
)

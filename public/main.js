import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MainPage from './components/MainPage.jsx'
import OrganizationPage from './components/OrganizationPage.jsx'
import NotFound from './components/NotFound.jsx'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const store = applyMiddleware(thunk)(createStore)(reducers)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={MainPage}/>
      <Route path='/organization/:id' component={OrganizationPage}/>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

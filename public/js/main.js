import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import OrganizationsTable from './OrganizationsTable.jsx'
import MembersTable from './MembersTable.jsx'
import { Provider } from 'react-redux'
import reducers from './../reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as AppActions from './../actions/App.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const store = applyMiddleware(thunk)(createStore)(reducers)

function _getOrganizationsTable() {
  return <OrganizationsTable changePage={this.props.actions.changePage} />
}

function _getOrganizationPage() {
  return <MembersTable changePage={this.props.actions.changePage} />
}

class App extends Component {
  pages = {
    'organizations': _getOrganizationsTable,
    'organization': _getOrganizationPage
  }

  render () {
    return this.pages[this.props.page].call(this)
  }
}

function mapStateToProps(state) {
  return {
    page: state.app.page,
    organization: state.app.organization
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

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import OrganizationsTable from './OrganizationsTable.jsx'
import MembersTable from './MembersTable.jsx'
import { Provider } from 'react-redux'
import reducers from './../reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = applyMiddleware(thunk)(createStore)(reducers)

function _getOrganizationsTable() {
  return <OrganizationsTable app={this} changePage={this.changePage} />
}

function _getOrganizationPage(organization) {
  return <MembersTable organization={organization} changePage={this.changePage} />
}

class App extends Component {
  pages = {
    'organizations': _getOrganizationsTable,
    'organization': _getOrganizationPage
  }

  constructor (props) {
    super(props)
    this.state = {
      page: 'organizations',
      organization: null
    }
  }

  changePage = function (page, organization) {
    this.setState({
      page: page,
      organization: organization
    })
  }

  render () {
    return this.pages[this.state.page].call(this, this.state.organization)
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
)

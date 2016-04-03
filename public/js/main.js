import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import OrganizationsTable from './OrganizationsTable.jsx'
import MembersTable from './MembersTable.jsx'

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
  <App />,
  document.getElementById('main')
)

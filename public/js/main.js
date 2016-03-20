import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Table from './Table.jsx'

function _getOrganizationsTable() {
  return <Table changeTablePage={this.changeTablePage} />
}

class App extends Component {
  pages = {
    'organizations': _getOrganizationsTable
  }

  constructor (props) {
    super(props)
    this.state = {
      page: 'organizations'
    }
  }

  changeTablePage = function (page) {
    this.setState({
      page: page
    })
  }

  render () {
    return this.pages[this.state.page].call(this)
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)

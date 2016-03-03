import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Table from './Table.jsx'

class App extends Component {
  render () {
    return (
      <Table/>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)

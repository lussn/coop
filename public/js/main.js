import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Table from './Table.jsx'
import Modal from './Modal.jsx'

class App extends Component {
  render () {
    return (
        <div>
          <Modal/>
          <Table/>
        </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)

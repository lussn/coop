import React, { Component } from 'react'
import TableBody from './TableBody.jsx'

class Table extends Component {
  render () {
    return (
      <table className="table table-hover table-bordered">
      <thead>
        <tr><th>Organization</th><th>Members</th><th>Actions</th></tr>
      </thead>
      <TableBody/>
      </table>
    )
  }
}
export default Table

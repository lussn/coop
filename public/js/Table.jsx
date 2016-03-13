import React, { Component } from 'react'
import FormModal from './FormModal.jsx'
import AjaxService from './../utils/AjaxService.js'

class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      organization: { _id: '', name: '', code: '', email: '' }, // TODO: domain objects
      action: 'add'
    }
  }

  componentDidMount () {
    this.getOrganizations()
  }

  deleteOrganization (coopId) {
    AjaxService.delete('/api/organizations/'+coopId, function (status, response) {
      if(status === 200) {
        this.getOrganizations()
      }
    }.bind(this))
  }

  editOrganization (coop) {
    this.setState({
      organization: coop,
      action: 'edit'
    })
  }

  getOrganizations = () => {
    AjaxService.get('/api/organizations', function(status, response) {
      if(status === 200) {
        this.setState({
          items: JSON.parse(response),
          action: 'add'
        })
      }
    }.bind(this))
  }

  render () {
    return (
      <div>
        <FormModal
          action={this.state.action}
          organization={this.state.organization}
          updateFunction={this.getOrganizations} />
        <table className="table table-hover table-bordered">
          <thead>
          <tr><th>Organization</th><th>Members</th><th>Edit</th><th>Delete</th></tr>
          </thead>
          <tbody>
          {this.state.items.map(function(item) {
            return <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.members.length}</td>
              <td><a onClick={this.editOrganization.bind(this, item)}>Edit</a></td>
              <td><a onClick={this.deleteOrganization.bind(this, item._id)}>Delete</a></td>
            </tr>;
          }.bind(this))}
          </tbody>
        </table>
      </div>
    )
  }
}
export default Table

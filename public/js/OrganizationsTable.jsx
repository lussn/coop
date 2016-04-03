import React, { Component } from 'react'
import OrganizationModal from './OrganizationModal.jsx'
import AjaxService from './../utils/AjaxService.js'

class OrganizationsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      current: { _id: '', name: '', code: '', email: '' }, // TODO: domain objects
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
      current: coop,
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
        <h1> Your Organizations </h1>
        <OrganizationModal
          action={this.state.action}
          item={this.state.current}
          updateFunction={this.getOrganizations} />
        <table className="table table-hover table-bordered">
          <thead>
          <tr><th>Organization</th><th>Members</th><th>Edit</th><th>Delete</th></tr>
          </thead>
          <tbody>
          {this.state.items.map(function(item) {
            return <tr key={item._id}>
              <td>
                <a onClick={this.props.changePage.bind(this.props.app, 'organization', item)}>
                  {item.name}
                </a>
              </td>
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
export default OrganizationsTable

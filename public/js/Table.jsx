import React, { Component } from 'react'
import Modal from './Modal.jsx'
import AjaxService from './../utils/AjaxService.js'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    };
  }

  componentDidMount () {
    AjaxService.get('/api/organizations', function(status, response) {
      if(status === 200) {
        this.setState({
          items: JSON.parse(response)
        })
      }
    }.bind(this))
  }

  deleteOrganization (coopId) {
    AjaxService.delete('/api/organizations/'+coopId, function (status, response) {
      if(status === 200) {
        this.setState({
          items: this.state.items.filter(function(item) {
            return (item._id !== coopId)
          })
        });
      }
    }.bind(this))
  }

  addNewOrganization = (organization) => {
    var items = this.state.items
    items.push(organization)
    this.setState({
      items: items
    })
  }

  render () {
    return (
      <div>
        <button type="button" className="btn btn-info btn-lg" data-toggle="modal"
                data-target="#organization-modal">Create Organization
        </button>
        <Modal updateFunction={this.addNewOrganization} />
        <table className="table table-hover table-bordered">
          <thead>
          <tr><th>Organization</th><th>Members</th><th>Actions</th></tr>
          </thead>
          <tbody>
          {this.state.items.map(function(item) {
            return <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.members.length}</td>
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

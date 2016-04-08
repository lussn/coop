import React, { Component } from 'react'
import AccountModal from './AccountModal.jsx'
import AjaxService from './../adapters/AjaxService.js'

class MembersTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      current: { _id: '', username: '', password: '', email: '' }, // TODO: domain objects
      action: 'add',
      organization: props.organization
    }
  }

  componentDidMount () {
    this.getAccounts()
  }

  deleteAccount (accountId) {
    AjaxService.delete('/api/organizations/'+coopId, function (status, response) {
      if(status === 200) {
        this.getOrganizations()
      }
    }.bind(this))
  }

  editAccount (account) {
    this.setState({
      current: account,
      action: 'edit'
    })
  }

  getAccounts = () => {
    AjaxService.get(
      '/api/organizations/' + this.state.organization._id + '/accounts',
      function(status, response) {
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
        <h1> {this.props.organization.name} members </h1>
        <AccountModal
          action={this.state.action}
          item={this.state.current}
          updateFunction={this.getAccounts} />
        <table className="table table-hover table-bordered">
          <thead>
          <tr><th>Username</th><th>Email</th><th>Edit</th><th>Delete</th></tr>
          </thead>
          <tbody>
          {this.state.items.map(function(item) {
            return <tr key={item._id}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td><a onClick={this.editAccount.bind(this, item)}>Edit</a></td>
              <td><a onClick={this.deleteAccount.bind(this, item._id)}>Delete</a></td>
            </tr>;
          }.bind(this))}
          </tbody>
        </table>
      </div>
    )
  }
}
export default MembersTable

import React, { Component } from 'react'
import AccountModal from './AccountModal.jsx'
import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'

function _getMembersFromOrganizationsArray(organization) {
  return JSON.parse(organization)[0].members;
}

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
    this.getAccounts(this.props.organization._id)
  }

  deleteAccountFromOrganization (accountId, organizationId) {
    OrganizationAjaxService.deleteAccountFromOrganization(
      accountId,
      organizationId,
      this.getAccounts.bind(this)
    )
  }

  editAccount (account) {
    this.setState({
      current: account,
      action: 'edit'
    })
  }

  getAccounts = (organizationId) => {
    OrganizationAjaxService.getOrganizationById(organizationId, function (organization) {
      this.setState({
        items: _getMembersFromOrganizationsArray(organization),
        action: 'add'
      })
    }.bind(this))
  }

  render () {
    return (
      <div>
        <h1> {this.props.organization.name} members </h1>
        <AccountModal
          action={this.state.action}
          item={this.state.current}
          updateFunction={this.getAccounts.bind(this, this.props.organization._id)} />
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
              <td>
                <a onClick={this.deleteAccountFromOrganization.bind(this, item._id, this.props.organization._id)}>
                  Delete
                </a>
              </td>
            </tr>;
          }.bind(this))}
          </tbody>
        </table>
      </div>
    )
  }
}
export default MembersTable

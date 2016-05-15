import React, { Component } from 'react'
import AccountModal from './AccountModal.jsx'
import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'
import * as OrganizationAccountsActions from './../actions/OrganizationAccounts.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class MembersTable extends Component {

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

  getAccounts = () => {
    this.props.actions.getAccountsFromOrganization(this.props.organization._id)
  }

  render () {
    debugger
    return (
      <div>
        <h1> {this.props.organization.name} members </h1>
        <AccountModal
          action={this.props.action}
          item={this.props.current}
          updateFunction={this.getAccounts.bind(this, this.props.organization._id)} />
        <table className="table table-hover table-bordered">
          <thead>
          <tr><th>Username</th><th>Email</th><th>Edit</th><th>Delete</th></tr>
          </thead>
          <tbody>
          {this.props.accounts.map(function(item) {
            return <tr key={item._id}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td><a onClick={this.editAccount.bind(this, item)}>Edit</a></td>
              <td>
                <a onClick={this.actions.deleteAccountFromOrganization.bind(this, item._id, this.props.organization._id)}>
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

function mapStateToProps(state) {
  debugger
  return {
    accounts: state.organizationAccounts.accounts,
    current: state.organizationAccounts.current,
    action: state.organizationAccounts.action,
    organization: state.organizationAccounts.organization
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(OrganizationAccountsActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersTable)

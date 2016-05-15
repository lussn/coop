import React, { Component } from 'react'
//import AccountModal from './AccountModal.jsx'
import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'
import * as OrganizationAccountsActions from './../actions/OrganizationAccounts.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class MembersTable extends Component {

  componentDidMount () {
    this.getAccounts()
  }

  editAccount (account) {
    /*this.setState({
      current: account,
      action: 'edit'
    })*/
  }

  getAccounts = () => {
    let organizationId = this.props.organization._id
    if (organizationId) {
      this.props.actions.getAccountsFromOrganization(organizationId)
    }
  }

  render () {
    return (
      <div>
        <h1> {this.props.organization.name} members </h1>
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
                <a onClick={this.props.actions.deleteAccountFromOrganization.bind(this, item._id, this.props.organization._id)}>
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
  return {
    accounts: state.organizationAccounts.accounts,
    current: state.organizationAccounts.current,
    action: state.organizationAccounts.action,
    organization: state.app.organization
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

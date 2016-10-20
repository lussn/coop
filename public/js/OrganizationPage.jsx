import React, { Component } from 'react'
import AccountModal from './AccountModal.jsx'
import * as OrganizationAccountsActions from './../actions/OrganizationAccounts.js'
import { Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class OrganizationPage extends Component {

  componentDidMount () {
    this.getAccounts()
  }

  openEditAccount (account) {
    this.props.actions.openEditAccount(account)
  }

  getAccounts = () => {
    this.props.actions.getAccountsFromOrganization(this.props.organizationId)
  }

  render () {
    return (
      <div>
        <h1> {this.props.organization.name} members </h1>
        <Button bsStyle='primary' className='create pull-right' onClick={this.props.actions.openAddAccount}>Add account</Button>
        <Button bsStyle='primary' className='create pull-right' >Edit basket</Button>
        <Button bsStyle='primary' className='create pull-right' >Order</Button>
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
                <td><a onClick={this.openEditAccount.bind(this, item)}>Edit</a></td>
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

function mapStateToProps(state, ownProps) {
  return {
    accounts: state.organizationAccounts.accounts,
    current: state.organizationAccounts.current,
    action: state.organizationAccounts.action,
    organization: state.organizationAccounts.organization,
    organizationId: ownProps.params.id
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
)(OrganizationPage)

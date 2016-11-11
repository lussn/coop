import React, { Component } from 'react'
import AccountModal from './AccountModal.jsx'
import ProductModal from './ProductModal.jsx'
import * as OrganizationActions from '../actions/Organization.js'
import { Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

class OrganizationPage extends Component {

  componentDidMount () {
    this.getAccounts()
  }

  openEditAccount (account) {
    this.props.actions.openEditAccount(account)
  }

  getAccounts = () => {
    this.props.actions.getOrganization(this.props.organizationId)
  }

  render () {
    return (
      <div>
        <Button bsStyle='primary' className='create pull-right' onClick={this.props.actions.openAddAccount}>Add account</Button>
        <Button
          bsStyle='primary'
          className='create pull-right'
          onClick={this.props.actions.openEditProduct.bind(this, this.props.organization.products[0])}
        >Edit basket</Button>
        <Button bsStyle='primary' className='create pull-right' >Order</Button>
        <AccountModal />
        <ProductModal />
        <h2> {this.props.organization.name} members </h2>
        <table className="table table-hover table-bordered">
          <thead>
            <tr><th>Username</th><th>Email</th><th>Edit</th><th>Delete</th></tr>
          </thead>
          <tbody>
            {this.props.organization.members.map(function(item) {
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
        <h2> {this.props.organization.name} Products </h2>
        <table className="table table-hover table-bordered">
          <thead>
            <tr><th>Name</th><th>Price</th><th>Description</th><th>Deliver date</th></tr>
          </thead>
          <tbody>
            {this.props.organization.products.map(function(item) {
              return <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{moment(new Date(item.deliverAt)).format('DD/MM/YYYY')}</td>
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
    current: state.organizations.current,
    action: state.organization.action,
    organization: state.organization.organization,
    organizationId: ownProps.params.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(OrganizationActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationPage)

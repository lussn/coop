import React, { Component } from 'react'
import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'
import ValidationService from './../../application/ValidatorService.js'
import { Button, Input } from 'react-bootstrap'
import * as OrganizationAccountsActions from './../actions/OrganizationAccounts.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Account from './../../domain/accounts/Account.js'

function _closeAndUpdate() {
  this.props.close()
  this.props.actions.getAccountsFromOrganization(this.props.organization._id)
}

function _saveAccount() {
  let account = Account.createFromJson(this.props.current)
  let save = OrganizationAjaxService.saveOrganizationAccount(
    this.props.action,
    this.props.organization._id,
    account
  )
  save.then(_closeAndUpdate.bind(this))
}

class AccountForm extends Component {

  handleName = (e) => { //TODO: move to a func/class
    let current = {
      username: e.target.value,
      password: this.props.current.password,
      email: this.props.current.email,
      _id: this.props.current._id
    }
    this.props.actions.updateAccountForm(current)
  }

  handlePassword = (e) => {
    let current = {
      username: this.props.current.username,
      password: e.target.value,
      email: this.props.current.email,
      _id: this.props.current._id
    }
    this.props.actions.updateAccountForm(current)
  }

  handleEmail = (e) => {
    let current = {
      username: this.props.current.username,
      password: this.props.current.password,
      email: e.target.value,
      _id: this.props.current._id
    }
    this.props.actions.updateAccountForm(current)
  }

  submit = (e) => {
    e.preventDefault()
    _saveAccount.call(this);
  }

  render () {
    return (
      <form>
        <Input
          onChange={this.handleName}
          type='text'
          label='Name:'
          placeholder='Enter name'
          value={this.props.current.username} />
        <Input
          onChange={this.handlePassword}
          type='password'
          label='Password:'
          value={this.props.current.password} />

        <Input
          onChange={this.handleEmail}
          type='text'
          label='Email:'
          placeholder='Enter email'
          value={this.props.current.email} />
        <Button type="submit" onClick={this.submit} >Submit</Button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    current: state.reducers.organizationAccounts.current,
    action: state.reducers.organizationAccounts.action,
    organization: state.reducers.app.organization
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
)(AccountForm)

import React, { Component } from 'react'
import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'
import ValidationService from './../../application/ValidatorService.js'
import { Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import * as OrganizationAccountsActions from './../actions/OrganizationAccounts.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Account from './../../domain/accounts/Account.js'

function _saveAccount() {
  let account = Account.createFromJson(this.props.current)
  this.props.actions.saveOrganizationAccount(
    this.props.action,
    this.props.organization._id,
    account
  )
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
        <FormGroup validationState='warning'>
          <ControlLabel>Name:</ControlLabel>
          <FormControl
            onChange={this.handleName}
            type='text'
            placeholder='Enter name'
            value={this.props.current.username} />
        </FormGroup>
        <FormGroup validationState='warning'>
          <ControlLabel>Password:</ControlLabel>
          <FormControl
            onChange={this.handlePassword}
            type='password'
            value={this.props.current.password} />
        </FormGroup>
        <FormGroup validationState='warning'>
          <ControlLabel>Email:</ControlLabel>
          <FormControl
            onChange={this.handleEmail}
            type='text'
            placeholder='Enter email'
            value={this.props.current.email} />
        </FormGroup>
        <Button type='submit' onClick={this.submit} >Submit</Button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
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
)(AccountForm)

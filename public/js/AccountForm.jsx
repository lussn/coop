import React, { Component } from 'react'
import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'
import ValidationService from './../../application/ValidatorService.js'
import { Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import * as OrganizationAccountsActions from './../actions/OrganizationAccounts.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Account from './../../domain/accounts/Account.js'
import {reduxForm} from 'redux-form'

function _saveAccount() {
  let account = Account.createFromJson({
    _id: this.props.current._id,
    username: this.props.fields.username.value,
    password: this.props.fields.password.value,
    email: this.props.fields.email.value
  })

  this.props.actions.saveOrganizationAccount(
    this.props.action,
    this.props.organization._id,
    account
  )
}

class AccountForm extends Component {

  submit = (e) => {
    e.preventDefault()
    _saveAccount.call(this);
  }

  getValidationState () {
    return (this.props.errorMessage !== null) ? 'error' : null
  }

  render () {
    const {fields: {username, password, email}} = this.props
    return (
      <form onSubmit={this.submit}>
        <FormGroup validationState={this.getValidationState()}>
          <ControlLabel>Name:</ControlLabel>
          <FormControl
            type='text'
            placeholder='Enter name'
            {...username} />
          {this.props.errorMessage && <HelpBlock>{this.props.errorMessage}</HelpBlock>}
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password:</ControlLabel>
          <FormControl
            type='password'
            {...password} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email:</ControlLabel>
          <FormControl
            type='text'
            placeholder='Enter email'
            {...email} />
        </FormGroup>
        <Button type='submit'>Submit</Button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    current: state.organizationAccounts.current,
    action: state.organizationAccounts.action,
    organization: state.organizationAccounts.organization,
    errorMessage: state.organizationAccounts.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(OrganizationAccountsActions, dispatch)
  }
}

AccountForm = reduxForm({
    form: 'account',
    fields: ['username', 'password', 'email']
  },
  state => ({
    initialValues: state.organizationAccounts.current
  })
)(AccountForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountForm)

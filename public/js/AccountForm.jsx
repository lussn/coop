import React, { Component } from 'react'
import OrganizationAjaxService from './../utils/OrganizationAjaxService.js'
import ValidationService from './../../application/ValidatorService.js'
import { Button, Input } from 'react-bootstrap'

function _closeAndUpdate() {
  this.props.close()
  this.props.updateFunction()
}

function _saveAccount() {
  let account = {
    username: this.state.username, // TODO: domain objects
    password: this.state.password,
    email: this.state.email
  }
  OrganizationAjaxService.saveAccount(
    organizationId,
    account,
    _closeAndUpdate.bind(this)
  )
}

class AccountForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: this.props.item.username,
      password: this.props.item.password,
      email: this.props.item.email,
      action: this.props.action
    }
  }

  handleName = (e) => {
    this.setState({username: e.target.value})
  }

  handlePassword = (e) => {
    this.setState({password: e.target.value})
  }

  handleEmail = (e) => {
    this.setState({email: e.target.value})
  }

  submit = (e) => {
    e.preventDefault()
    _saveAccount.call(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      username: nextProps.item.username,
      password: nextProps.item.password,
      email: nextProps.item.email,
      action: nextProps.action
    })
  }

  render () {
    return (
      <form>
        <Input
          onChange={this.handleName}
          type='text'
          label='Name:'
          placeholder='Enter name'
          value={this.state.username} />
        <Input
          onChange={this.handlePassword}
          type='password'
          label='Password:'
          value={this.state.password} />

        <Input
          onChange={this.handleEmail}
          type='text'
          label='Email:'
          placeholder='Enter email'
          value={this.state.email} />
        <Button type="submit" onClick={this.submit} >Submit</Button>
      </form>
    )
  }
}

export default AccountForm

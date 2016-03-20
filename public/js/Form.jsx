import React, { Component } from 'react'
import OrganizationAjaxService from './../utils/OrganizationAjaxService.js'
import ValidationService from './../../application/ValidatorService.js'
import { Button, Input } from 'react-bootstrap'

function _closeAndUpdate() {
  this.props.close()
  this.props.updateFunction()
}

function _saveOrganization() {
  let coop = {
    name: this.state.name, // TODO: domain objects
    code: this.state.code,
    email: this.state.email,
    id: this.state._id
  }
  OrganizationAjaxService.saveOrganization(
    this.state.action,
    coop,
    _closeAndUpdate.bind(this)
  )
}

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      _id: this.props.organization._id,
      name: this.props.organization.name,
      code: this.props.organization.code,
      email: this.props.organization.email,
      action: this.props.action
    }
  }

  handleName = (e) => {
    this.setState({name: e.target.value})
  }

  handleCode = (e) => {
    this.setState({code: e.target.value})
  }

  handleEmail = (e) => {
    this.setState({email: e.target.value})
  }

  submit = (e) => {
    e.preventDefault()
    _saveOrganization.call(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      _id: nextProps.organization._id,
      name: nextProps.organization.name,
      code: nextProps.organization.code,
      email: nextProps.organization.email,
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
          value={this.state.name} />
        <Input
          onChange={this.handleCode}
          type='text'
          label='CIF/NIF:'
          placeholder='Enter CIF/NIF'
          value={this.state.code} />

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

export default Form

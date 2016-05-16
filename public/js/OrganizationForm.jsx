import React, { Component } from 'react'
import ValidationService from './../../application/ValidatorService.js'
import { Button, Input } from 'react-bootstrap'
import * as OrganizationActions from './../actions/Organization.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Organization from './../../domain/organizations/Organization.js'

function _saveOrganization() {
  this.props.actions.saveOrganization(
    this.props.action,
    Organization.createFromJson(this.props.current)
  )
}

class OrganizationForm extends Component {

  handleName = (e) => { //TODO: move to a func/class
    let current = {
      name: e.target.value,
      code: this.props.current.code,
      email: this.props.current.email,
      _id: this.props.current._id
    }
    this.props.actions.updateOrganizationForm(current)
  }

  handleCode = (e) => {
    let current = {
      name: this.props.current.name,
      code: e.target.value,
      email: this.props.current.email,
      _id: this.props.current._id
    }
    this.props.actions.updateOrganizationForm(current)
  }

  handleEmail = (e) => {
    let current = {
      name: this.props.current.name,
      code: this.props.current.code,
      email: e.target.value,
      _id: this.props.current._id
    }
    this.props.actions.updateOrganizationForm(current)
  }

  submit = (e) => {
    e.preventDefault()
    _saveOrganization.call(this);
  }

  render () {
    return (
      <form>
        <Input
          onChange={this.handleName}
          type='text'
          label='Name:'
          placeholder='Enter name'
          value={this.props.current.name} />
        <Input
          onChange={this.handleCode}
          type='text'
          label='CIF/NIF:'
          placeholder='Enter CIF/NIF'
          value={this.props.current.code} />

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
    current: state.organizations.current,
    action: state.organizations.action
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
)(OrganizationForm)

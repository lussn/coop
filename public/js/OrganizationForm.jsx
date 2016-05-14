import React, { Component } from 'react'
import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'
import ValidationService from './../../application/ValidatorService.js'
import { Button, Input } from 'react-bootstrap'
import * as OrganizationActions from './../actions/Organization.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function _closeAndUpdate() {
  this.props.close()
  this.props.actions.getOrganizations()
}

function _saveOrganization() {
  let coop = {
    name: this.props.current.name, // TODO: domain objects
    code: this.props.current.code,
    email: this.props.current.email,
    id: this.props.current._id
  }
  OrganizationAjaxService.saveOrganization(
    this.props.action,
    coop,
    _closeAndUpdate.bind(this)
  )
}

class OrganizationForm extends Component {

  handleName = (e) => { //move to a func
    let current = {
      name: e.target.value, // TODO: domain objects
      code: this.props.current.code,
      email: this.props.current.email,
      _id: this.props.current._id
    }
    this.props.actions.updateOrganizationForm(current)
  }

  handleCode = (e) => {
    let current = {
      name: this.props.current.name, // TODO: domain objects
      code: e.target.value,
      email: this.props.current.email,
      _id: this.props.current._id
    }
    this.props.actions.updateOrganizationForm(current)
  }

  handleEmail = (e) => {
    let current = {
      name: this.props.current.name, // TODO: domain objects
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
    current: state.current,
    action: state.action
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

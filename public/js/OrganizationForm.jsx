import React, { Component } from 'react'
import ValidationService from './../../application/ValidatorService.js'
import { Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import * as OrganizationActions from './../actions/Organization.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Organization from './../../domain/organizations/Organization.js'
import {reduxForm} from 'redux-form'

function _saveOrganization() {
  this.props.actions.saveOrganization(
    this.props.action,
    Organization.createFromJson({
      _id: this.props.current._id,
      name: this.props.fields.name.value,
      code: this.props.fields.code.value,
      email: this.props.fields.email.value
    })
  )
}

class OrganizationForm extends Component {

  submit = (e) => {
    e.preventDefault()
    _saveOrganization.call(this)
  }

  getValidationState () {
    return (this.props.errorMessage !== null) ? 'error' : null
  }

  render () {
    const {fields: {name, code, email}} = this.props
    return (
      <form onSubmit={this.submit}>
        <FormGroup validationState={this.getValidationState()}>
          <ControlLabel>Name:</ControlLabel>
          <FormControl
            type='text'
            placeholder='Enter name'
            {...name} />
          {this.props.errorMessage && <HelpBlock>{this.props.errorMessage}</HelpBlock>}
        </FormGroup>
        <FormGroup>
          <ControlLabel>CIF/NIF:</ControlLabel>
          <FormControl
            type='text'
            placeholder='Enter CIF/NIF'
            {...code} />
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
    current: state.organizations.current,
    action: state.organizations.action,
    errorMessage: state.organizations.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(OrganizationActions, dispatch)
  }
}

OrganizationForm = reduxForm({
    form: 'organization',
    fields: ['name', 'code', 'email']
  },
  state => ({
    initialValues: state.organizations.current
  })
)(OrganizationForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationForm)

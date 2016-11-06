import React, { Component } from 'react'
import { Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import * as OrganizationActions from '../actions/Organization.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Product from './../../domain/products/Product.js'
import {reduxForm} from 'redux-form'

function _saveProduct() {
/*  let account = Account.createFromJson({
    _id: this.props.current._id,
    username: this.props.fields.username.value,
    password: this.props.fields.password.value,
    email: this.props.fields.email.value
  })

  this.props.actions.saveOrganizationAccount(
    this.props.action,
    this.props.organization._id,
    account
  )*/
}

class ProductForm extends Component {

  submit = (e) => {
    e.preventDefault()
    _saveProduct.call(this);
  }

  getValidationState () {
    return (this.props.errorMessage !== null) ? 'error' : null
  }

  render () {
    const {fields: {name, price, description, deliverAt}} = this.props
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
          <ControlLabel>Price:</ControlLabel>
          <FormControl
            type='text'
            {...price} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description:</ControlLabel>
          <FormControl
            componentClass="textarea"
            {...description} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Deliver at:</ControlLabel>
          <FormControl
            type='text'
            {...deliverAt} />
        </FormGroup>
        <Button type='submit'>Submit</Button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    current: state.organization.current,
    action: state.organization.action,
    organization: state.organization.organization,
    errorMessage: state.organization.errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(OrganizationActions, dispatch)
  }
}

ProductForm = reduxForm({
    form: 'product',
    fields: ['name', 'price', 'description', 'deliverAt']
  },
  state => ({
    initialValues: state.organization.current
  })
)(ProductForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm)

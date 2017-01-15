import React, { Component } from 'react'
import { Button, FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import * as OrganizationActions from '../actions/Organization.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Product from './../../domain/products/Product.js'
import {reduxForm} from 'redux-form'
import moment from 'moment'

function _saveProduct () {
  let productId = (this.props.current) ? this.props.current._id : null
  let product = Product.createFromJson({
    _id: productId,
    name: this.props.fields.name.value,
    price: this.props.fields.price.value,
    description: this.props.fields.description.value,
    deliverAt: this.props.fields.deliverAt.value
  })

  this.props.actions.saveOrganizationProduct(
    this.props.action,
    this.props.organization._id,
    product
  )
}

function _getCurrentValues (current) {
  if (current && current.deliverAt) {
    current.deliverAt = moment(new Date(current.deliverAt)).format('YYYY/MM/DD')
  }
  return current
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
          <ControlLabel>Deliver at: (YYYY/MM/DD)</ControlLabel>
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
    initialValues: _getCurrentValues(state.organization.current)
  })
)(ProductForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm)

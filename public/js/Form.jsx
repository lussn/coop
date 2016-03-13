import React, { Component } from 'react'
import AjaxService from './../utils/AjaxService.js'
import { Button, Input } from 'react-bootstrap'

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
    let coop = this.state // TODO: domain objects
    let id = this.state._id
    
    if(this.state.action === 'add') {
      AjaxService.post('/api/organizations', coop, function (status, response) {
        if(status === 200) {
          this.props.close()
          this.props.updateFunction()
        }
      }.bind(this))
    } else {
      delete coop._id // TODO: domain objects
      delete coop.action
      AjaxService.put('/api/organizations/'+id, coop, function (status, response) {
        if(status === 200) {
          this.props.close()
          this.props.updateFunction()
        }
      }.bind(this))
    }
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

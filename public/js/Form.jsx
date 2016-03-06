import React, { Component } from 'react'
import AjaxService from './../utils/AjaxService.js'
import { Button, Input } from 'react-bootstrap'

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      code: '',
      email: ''
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

  addOrganization = (e) => {
    e.preventDefault()
    AjaxService.post('/api/organizations', this.state, function (status, response) {
      if(status === 200) {
        this.props.close()
        this.props.updateFunction(JSON.parse(response))
      }
    }.bind(this))
  }

  render () {
    return (
      <form>
        <Input onChange={this.handleName} type='text' label='Name:' placeholder='Enter name' />
        <Input onChange={this.handleCode} type='text' label='CIF/NIF:' placeholder='Enter CIF/NIF' />
        <Input onChange={this.handleEmail} type='text' label='Email:' placeholder='Enter email' />
        <Button onClick={this.addOrganization} >Submit</Button>
      </form>
    )
  }
}

export default Form

import React, { Component } from 'react'
import AjaxService from './../utils/AjaxService.js'

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
        document.getElementsByClassName('modal-backdrop')[0].click()
        this.props.updateFunction(JSON.parse(response))
      }
    }.bind(this))
  }

  render () {
    return (
      <form role="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input onChange={this.handleName} type="text" className="form-control" id="name"/>
        </div>
        <div className="form-group">
          <label htmlFor="code">CIF/NIF:</label>
          <input onChange={this.handleCode} type="text" className="form-control" id="code"/>
        </div>
        <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input onChange={this.handleEmail} type="email" className="form-control" id="email"/>
        </div>
        <button onClick={this.addOrganization} className="btn btn-default">Submit</button>
      </form>
    )
  }
}

export default Form

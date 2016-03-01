import React, { Component } from 'react'

class Form extends Component {
  render () {
    return (
      <form role="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name"/>
        </div>
        <div className="form-group">
          <label htmlFor="code">CIF/NIF:</label>
          <input type="text" className="form-control" id="code"/>
        </div>
        <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input type="email" className="form-control" id="email"/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    )
  }
}

export default Form

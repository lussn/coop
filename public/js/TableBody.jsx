import React, { Component } from 'react'
import AjaxService from './../utils/AjaxService.js'

class TableBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    };
  }

  componentDidMount () {
    AjaxService.get('/api/organizations', function(status, response) {
      if(status === 200) {
        this.setState({
          items: JSON.parse(response)
        })
      }
    }.bind(this))
  }

  deleteOrganization (coopId) {
    AjaxService.delete('/api/organizations/'+coopId, function (status, response) {
      if(status === 200) {
        this.setState({
          items: this.state.items.filter(function(item) {
            return (item._id !== coopId)
          })
        });
      }
    }.bind(this))
  }

  render () {
    return (
      <tbody>
        {this.state.items.map(function(item) {
          return <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.members.length}</td>
              <td><a onClick={this.deleteOrganization.bind(this, item._id)}>Delete</a></td>
            </tr>;
        }.bind(this))}
      </tbody>
    )
  }
}
export default TableBody

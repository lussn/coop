import React, { Component } from 'react'
import OrganizationModal from './OrganizationModal.jsx'
import OrganizationAjaxService from './../adapters/OrganizationAjaxService.js'
import * as OrganizationActions from './../actions/Organization.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class OrganizationsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      current: { _id: '', name: '', code: '', email: '' }, // TODO: domain objects
      action: 'add'
    }
  }

  componentDidMount () {
    this.getOrganizations()
  }

  deleteOrganization (organizationId) {
    OrganizationAjaxService.deleteOrganization(
      organizationId,
      this.getOrganizations.bind(this)
    )
  }

  editOrganization (coop) {
    this.setState({
      current: coop,
      action: 'edit'
    })
  }

  getOrganizations () {
    this.props.actions.getOrganizations()
  }

  render () {
    return (
      <div>
        <h1> Your Organizations </h1>
        <OrganizationModal
          action={this.state.action}
          item={this.state.current}
          updateFunction={this.getOrganizations.bind(this)} />
        <table className="table table-hover table-bordered">
          <thead>
          <tr><th>Organization</th><th>Members</th><th>Edit</th><th>Delete</th></tr>
          </thead>
          <tbody>
          {this.props.organizations.map(function(item) {
            return <tr key={item._id}>
              <td>
                <a onClick={this.props.changePage.bind(this.props.app, 'organization', item)}>
                  {item.name}
                </a>
              </td>
              <td>{item.members.length}</td>
              <td><a onClick={this.editOrganization.bind(this, item)}>Edit</a></td>
              <td><a onClick={this.props.actions.deleteOrganization.bind(this, item._id)}>Delete</a></td>
            </tr>;
          }.bind(this))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    organizations: state
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
)(OrganizationsTable)

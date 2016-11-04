import React, { Component } from 'react'
import FormModal from './FormModal.jsx'
import OrganizationForm from './OrganizationForm.jsx'
import { Button, Modal } from 'react-bootstrap'
import * as OrganizationsActions from '../actions/Organizations.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class OrganizationModal extends FormModal {
  render () {
    return (
      <div>
        <Button bsStyle='primary' className='create pull-right' onClick={this.props.actions.openAddOrganization}>Create organization</Button>
        <Modal show={this.props.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Organization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OrganizationForm close={this.close.bind(this)} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    current: state.organizations.current,
    showModal: state.organizations.showModal,
    action: state.organizations.action
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(OrganizationsActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationModal)

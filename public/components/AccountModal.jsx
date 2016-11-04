import React, { Component } from 'react'
import FormModal from './FormModal.jsx'
import AccountForm from './AccountForm.jsx'
import { Button, Modal } from 'react-bootstrap'
import * as OrganizationActions from '../actions/Organization.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class AccountModal extends FormModal {

  render () {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AccountForm close={this.close.bind(this)} />
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
    current: state.organization.current,
    showModal: state.organization.showModal,
    action: state.organization.action
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
)(AccountModal)

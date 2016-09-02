import React, { Component } from 'react'
import FormModal from './FormModal.jsx'
import AccountForm from './AccountForm.jsx'
import { Button, Modal } from 'react-bootstrap'
import * as OrganizationAccountsActions from './../actions/OrganizationAccounts.js'
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
    current: state.organizationAccounts.current,
    showModal: state.organizationAccounts.showModal,
    action: state.organizationAccounts.action
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(OrganizationAccountsActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountModal)

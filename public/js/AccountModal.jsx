import React, { Component } from 'react'
import FormModal from './FormModal.jsx'
import AccountForm from './AccountForm.jsx'
import { Button, Modal } from 'react-bootstrap'

class AccountModal extends FormModal {

  open () {
    this.setState({
      item: { username: '', password: '', email: ''}, // TODO: domain objects
      showModal: true,
      action: 'add'
    })
  }

  render () {
    return (
      <div>
        <Button bsStyle='primary' className='create pull-right' onClick={this.open}>Add account</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AccountForm
              action={this.state.action}
              item={this.state.item}
              updateFunction={this.props.updateFunction}
              close={this.close} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default AccountModal
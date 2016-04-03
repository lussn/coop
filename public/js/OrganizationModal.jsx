import React, { Component } from 'react'
import FormModal from './FormModal.jsx'
import OrganizationForm from './OrganizationForm.jsx'
import { Button, Modal } from 'react-bootstrap'

class OrganizationModal extends FormModal {

  open () {
    this.setState({
      item: { _id: '', name: '', code: '', email: ''}, // TODO: domain objects
      showModal: true,
      action: 'add'
    })
  }

  render () {
    return (
      <div>
        <Button bsStyle='primary' className='create pull-right' onClick={this.open}>Create organization</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Organization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OrganizationForm
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

export default OrganizationModal
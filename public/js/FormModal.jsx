import React, { Component } from 'react'
import Form from './Form.jsx'
import { Button, Modal } from 'react-bootstrap'

class FormModal extends Component {

  constructor (props) {
    super(props)
    this.state = { showModal: false }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  close () {
    this.setState({ showModal: false })
  }

  open () {
    this.setState({ showModal: true })
  }

  render () {
    return (
      <div>
        <Button bsStyle='primary' onClick={this.open}>
          Launch modal
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form updateFunction={this.props.updateFunction} close={this.close} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default FormModal

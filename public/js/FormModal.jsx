import React, { Component } from 'react'
import OrganizationForm from './OrganizationForm.jsx'
import { Button, Modal } from 'react-bootstrap'

class FormModal extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      item: props.item,
      action: props.action
    }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  close () {
    this.setState({ showModal: false })
  }

  open () {
    this.setState({
      item: { _id: '', name: '', code: '', email: ''}, // TODO: domain objects
      showModal: true,
      action: 'add'
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      item: nextProps.item,
      showModal: nextProps.action !== 'add',
      action: nextProps.action
    })
  }

  render () {
    return (
      <div>
        <Button bsStyle='primary' onClick={this.open}>Create organization</Button>
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

export default FormModal

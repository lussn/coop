import React, { Component } from 'react'

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
      </div>
    )
  }
}

export default FormModal

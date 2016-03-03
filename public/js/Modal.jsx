import React, { Component } from 'react'
import Form from './Form.jsx'

class Modal extends Component {
  // if props.organization ... something
  render () {
    return (
      <div id='organization-modal' className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add new organization</h4>
            </div>
            <div className="modal-body">
              <Form updateFunction={this.props.updateFunction} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Modal

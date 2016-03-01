var React = require('react');
var Form = require('./Form.jsx');

var Modal = React.createClass({
  render: function () {
    return (
      <div>
        <button type="button" className="btn btn-info btn-lg" data-toggle="modal"
                data-target="#add-organization">Create Organization
        </button>
        <div id="add-organization" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add new organization</h4>
              </div>
              <div className="modal-body">
                <Form/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;

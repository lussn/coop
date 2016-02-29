var React = require('react');

var Modal = React.createClass({
  render: function() {
    return (
        <div>
          <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#add-cooperative">Create Cooperative</button>
          <div id="add-cooperative" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add new cooperative</h4>
                </div>
                <div className="modal-body">
                  <p>Some text in the modal.</p>
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

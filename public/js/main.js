var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('./Table.jsx');
var Modal = require('./Modal.jsx');

var App = React.createClass({
  render: function() {
    return (
        <div>
          <Modal/>
          <Table/>
        </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('main')
);

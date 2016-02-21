var React = require('react');
var ReactDOM = require('react-dom');

var CrudTable = React.createClass({
  render: function() {
    return (
      <table className="table table-hover table-bordered">
      <thead>
        <tr><th>Cooperative</th><th>Members</th><th>Actions</th></tr>
      </thead>
      <tbody>
        <tr><td>Una</td><td>12</td><td>Delete</td></tr>
        <tr><td>Dos</td><td>10</td><td>Delete</td></tr>
        <tr><td>Tres</td><td>0</td><td>Delete</td></tr>
      </tbody>
      </table>
    );
  }
});

ReactDOM.render(
  <CrudTable />,
  document.getElementById('main')
);
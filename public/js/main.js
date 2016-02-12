var React = require('react');
var ReactDOM = require('react-dom');

var CrudTable = React.createClass({
  render: function() {
    return (
      <table className="table">
      <tbody>
        <tr><th>Cooperative</th><th>Edit</th><th>Delete</th></tr>
        <tr><td>Una</td><td>Edit</td><td>Delete</td></tr>
        <tr><td>Dos</td><td>Edit</td><td>Delete</td></tr>
        <tr><td>Tres</td><td>Edit</td><td>Delete</td></tr>
      </tbody>
      </table>
    );
  }
});

ReactDOM.render(
  <CrudTable />,
  document.getElementById('main')
);
var React = require('react');
var TableBody = require('./TableBody.jsx');

var Table = React.createClass({
  render: function() {
    return (
      <table className="table table-hover table-bordered">
      <thead>
        <tr><th>Organization</th><th>Members</th><th>Actions</th></tr>
      </thead>
      <TableBody/>
      </table>
    );
  }
});

module.exports = Table;

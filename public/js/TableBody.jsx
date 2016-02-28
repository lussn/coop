var React = require('react');

var TableBody = React.createClass({
  render: function() {
    return (
      <tbody>
        {this.props.cooperatives.map(function(coop) {
          return <tr key={coop._id}>
              <td>{coop.name}</td>
              <td>{coop.members.length}</td>
              <td>Delete</td>
            </tr>;
        })}
      </tbody>
    );
  }
});

module.exports = TableBody;
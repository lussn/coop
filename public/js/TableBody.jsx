var React = require('react');
var AjaxService = require('./../utils/AjaxService.js');

var TableBody = React.createClass({
  getInitialState : function() {
    return {
      items : []
    };
  },
  componentDidMount: function() {
    AjaxService.get('/api/cooperatives', function(status, response) {
      if(status === 200) {
        this.setState({
          items: JSON.parse(response)
        });
      }
    }.bind(this));
  },
  deleteCooperative: function (coopId) {
    AjaxService.delete('/api/cooperatives/'+coopId, function (status, response) {
      if(status === 200) {
        this.setState({
          items: this.state.items.filter(function(item) {
            return (item._id !== coopId);
          })
        });
      }
    }.bind(this));
  },
  render: function () {
    return (
      <tbody>
        {this.state.items.map(function(item) {
          return <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.members.length}</td>
              <td><a onClick={this.deleteCooperative.bind(this, item._id)}>Delete</a></td>
            </tr>;
        }.bind(this))}
      </tbody>
    );
  }
});

module.exports = TableBody;
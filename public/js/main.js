var React = require('react');
var ReactDOM = require('react-dom');
var AjaxService = require('./../utils/AjaxService.js');
var TableBody = require('./TableBody.jsx');

var Table = React.createClass({
  getInitialState : function() {
    return {
      cooperatives : []
    };
  },
  componentDidMount: function() {
    AjaxService.get('/api/cooperatives', function(status, response) {
      if(status === 200) {
        this.setState({
          cooperatives: JSON.parse(response)
        });
      }
    }.bind(this));
  },
  render: function() {
    return (
      <table className="table table-hover table-bordered">
      <thead>
        <tr><th>Cooperative</th><th>Members</th><th>Actions</th></tr>
      </thead>
      <TableBody cooperatives={this.state.cooperatives}/>
      </table>
    );
  }
});

ReactDOM.render(
  <Table />,
  document.getElementById('main')
);
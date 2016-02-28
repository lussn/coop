var React = require('react');
var ReactDOM = require('react-dom');
var AjaxService = require('./../utils/AjaxService.js');
var Table = require('./Table.jsx');

var App = React.createClass({
  render: function() {
    return (
      <Table/>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
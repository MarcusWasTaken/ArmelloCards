import React from 'react'
import CardStore from '../stores/CardStore'
import CardActions from '../actions/CardActions'

const FilterRow = React.createClass({

  getInitialState: function() {
    return {
      filter: ''
    }
  },

  componentDidUpdate: function() {
    CardActions.filter(this.state.filter)
  },
  
  render: function() {
    return (
      <div className="clearfix">
        <h4>Search</h4>
        <span className="pull-left">
          <input onChange={this._onChange} value={this.state.filter}></input>
          <button onClick={this._onClear} className="close"><span>&times;</span></button>
        </span>
      </div>
    )
  },

  _onChange: function(event) {
    this.setState({ filter: event.target.value.toLowerCase() })
  },

  _onClear: function() {
    this.setState({ filter: '' })
  }

})

export default FilterRow
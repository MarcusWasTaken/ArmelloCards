import React from 'react'
import FilterStore from '../stores/FilterStore'
import FilterActions from '../actions/FilterActions'
import Symbol from '../components/Symbol'
import SearchBar from '../components/SearchBar'
import 'css/filters'

const getState = () => {
  return {
    textFilter: FilterStore.get('text'),
    symbolFilter: FilterStore.get('symbol')
  }
}

const Filters = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    FilterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    FilterStore.removeChangeListener(this._onChange);
  },
  
  render: function() {
    let symbols = this.state.symbolFilter.map(symbol => (
      <Symbol key={symbol.name} {...symbol} onClick={this._onFilterChange} />
    ))

    return (
      <div className="filters">
        <h1>Armello Cards</h1>
        <h4>Search</h4>
        <SearchBar onChange={this._onFilterChange} value={this.state.textFilter} />
        <h4>Symbols</h4>
        <div className="btn-group btn-group-sm">
          {symbols}
        </div>  
      </div>
    )
  },

  _onFilterChange: function(type) {
    return (event) => {
      FilterActions.filter(event.target.value.toLowerCase(), type)
    }
  },

  _onChange: function() {
    this.setState(getState());
  }

})

export default Filters
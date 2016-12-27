import React from 'react'
import FilterStore from '../stores/FilterStore'
import FilterActions from '../actions/FilterActions'
import cx from 'classnames'
import lib from 'js/lib'

const getState = () => {
  return {
    textFilter: FilterStore.get('text'),
    symbolFilter: FilterStore.get('symbol')
  }
}

const SearchBar = React.createClass({

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
    return (
      <div className="clearfix">
        <div className="pull-left">
          <h4>Symbols</h4>
          {this._renderSymbols()}
        </div>
        <div className="pull-right">
          <h4>Search</h4>
          <input onChange={this._onTextChange} value={this.state.textFilter}></input>
        </div>
      </div>
    )
  },

  _renderSymbols: function() {
    return this.state.symbolFilter.map(symbol => (
      <button
        key={symbol.name}
        className={cx('btn btn-default', {
          active: symbol.active
        })}
        target={symbol.name}
        onClick={this._onSymbolChange}
      >
        {symbol.name}
      </button>
    ))
  },

  _onTextChange: function(event) {
    FilterActions.filterText(event.target.value.toLowerCase())
  },

  _onSymbolChange: function(event) {
    FilterActions.filterSymbol(event.target.getAttribute('target'))
  },

  _onChange: function() {
    this.setState(getState());
  },

  // _onChange: function(event) {
  //   this.setState({ filter: event.target.value.toLowerCase() })
  // },

})

export default SearchBar
import React from 'react'
import CardList from './CardList'
import DeckStore from '../stores/DeckStore'
import SearchBar from './SearchBar'
import 'css/main'

const App = React.createClass({

  getInitialState: function() {
    return this._getState();
  },

  componentDidMount: function() {
    DeckStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DeckStore.removeChangeListener(this._onChange);
  },

  render: function() {

    return (
      <div className="main">
        <SearchBar />
        {this._renderCardList()}
      </div>
    )
  },

  _renderCardList: function() {
    return this.state.decks.map(deck => (
      <CardList key={deck.id} {...deck} />
    ))
  },

  _onChange: function() {
    this.setState(this._getState());
  },

  _getState: function() {
    return {
      decks: DeckStore.getAll()
    }
  }

})

export default App
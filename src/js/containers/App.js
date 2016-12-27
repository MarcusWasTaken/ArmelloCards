import React from 'react'
import Deck from './Deck'
import DeckStore from '../stores/DeckStore'
import Filters from './Filters'
import 'css/main'

const getState = () => {
  return {
    decks: DeckStore.getAll()
  }
}

const App = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    DeckStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DeckStore.removeChangeListener(this._onChange);
  },

  render: function() {

    let decks = this.state.decks.map(deck => (
      <Deck key={deck.id} {...deck} />
    ))

    return (
      <div className="main">
        <Filters />
        {decks}
      </div>
    )
  },

  _onChange: function() {
    this.setState(getState());
  },

})

export default App
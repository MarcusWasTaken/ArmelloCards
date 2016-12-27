import React from 'react'
import Deck from './Deck'
import DeckTab from '../components/DeckTab'
import DeckStore from '../stores/DeckStore'
import DeckActions from '../actions/DeckActions'
import Filters from './Filters'
import 'css/main'

const getState = () => {
  return {
    decks: DeckStore.getAll(),
    activeName: DeckStore.getActiveName()
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

    let deckTabs = this.state.decks.map(deck => (
      <DeckTab key={deck.id} {...deck} active={this.state.activeName} onClick={this._onTabClick} />
    ))

    return (
      <div className="main">
        <Filters />
        <br />
        <ul className="nav nav-tabs">
          {deckTabs}
        </ul>
        <br />
        <Deck />
      </div>
    )
  },

  _onTabClick: function(event) {
    DeckActions.setActive(event.target.getAttribute('value').toLowerCase())
  },

  _onChange: function() {
    this.setState(getState());
  },

})

export default App
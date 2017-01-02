import React from 'react'
import Deck from './Deck'
import DeckTab from '../components/DeckTab'
import DeckStore from '../stores/DeckStore'
import DeckActions from '../actions/DeckActions'
import Filters from './Filters'
import 'css/app'

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
      <div className="app clearfix">
        <div className="main">
          <ul className="tab-list">
            {deckTabs}
          </ul>
          <Deck />
        </div>
        <aside className="filters">
          <Filters />
        </aside>
      </div>
    )
  },

  _onTabClick: function(event) {
    event.preventDefault()
    DeckActions.setActive(event.currentTarget.getAttribute('value').toLowerCase())
  },

  _onChange: function() {
    this.setState(getState());
  },

})

export default App
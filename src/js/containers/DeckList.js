import React from 'react'
import DeckTab from '../components/DeckTab'
import DeckStore from '../stores/DeckStore'
import DeckActions from '../actions/DeckActions'

const getState = () => {
  return {
    decks: DeckStore.getAll(),
    activeName: DeckStore.getActiveName()
  }
}

const DeckList = React.createClass({

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
      <ul className="tab-list">
        {deckTabs}
      </ul>
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

export default DeckList
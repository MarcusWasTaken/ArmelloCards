import React from 'react'
import Card from '../components/Card'
import Masonry from 'masonry-layout'
import CardStore from '../stores/CardStore'
import DeckStore from '../stores/DeckStore'
import 'css/deck'

const getState = () => {
  return {
    deck: DeckStore.getActive()
  }
}

const Deck = React.createClass({

  getInitialState: function() {
    return getState()
  },

  componentDidMount: function() {
    DeckStore.addChangeListener(this._onChange)
    this.masonry = new Masonry( this.list, {
      itemSelector: '.card',
      gutter: 10,
      percentPosition: true,
      transitionDuration: '0.2s'
    })
  },

  componentWillUnmount: function() {
    DeckStore.removeChangeListener(this._onChange)
  },

  componentDidUpdate: function() {
    this.masonry.reloadItems()
    this.masonry.layout()
    this._masonryFix()
  },
  
  render: function() {

    let deck = this.state.deck
    let cards = CardStore.getFiltered(deck.id).map(card => (
      <Card key={card.name} {...card} deck={deck.id} />
    ))

    return (
      <div>
        <ul className="deck" ref={(ul) => { this.list = ul }}>
          {cards}
        </ul>
      </div>
    )
  },

  _masonryFix: function() {
    clearTimeout(this.timer)
    this.timer = setTimeout(function() {
      this.masonry.layout()
    }.bind(this), 200)
  },

  _onChange: function() {
    this.setState(getState())
  }

})

export default Deck
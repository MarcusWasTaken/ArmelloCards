import React from 'react'
import Card from '../components/Card'
import Masonry from 'masonry-layout'
import CardStore from '../stores/CardStore'

const getState = (deck) => {
  return {
    cards: CardStore.getFiltered(deck)
  }
}

const Deck = React.createClass({

  getInitialState: function() {
    return getState(this.props.id)
  },

  componentDidMount: function() {
    CardStore.addChangeListener(this._onChange)
    this.masonry = new Masonry( this.list, {
      itemSelector: '.card',
      gutter: 10,
      percentPosition: true,
      transitionDuration: '0.2s'
    })
  },

  componentWillUnmount: function() {
    CardStore.removeChangeListener(this._onChange)
  },

  componentDidUpdate: function() {
    this.masonry.reloadItems()
    this.masonry.layout()
    this._masonryFix()
  },
  
  render: function() {
    let deck = this.props

    return (
      <div>
        <h3>{deck.name} <small>{deck.filteredCardCount}/{deck.cardCount}</small></h3>
        <ul className="card-list" ref={(ul) => { this.list = ul }}>
          {this._renderCards()}
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

  _renderCards: function() {
    return this.state.cards.map(card => (
      <Card key={card.name} {...card} deck={this.props.id} />
    ))
  },

  _onChange: function() {
    this.setState(getState(this.props.id))
  }

})

export default Deck
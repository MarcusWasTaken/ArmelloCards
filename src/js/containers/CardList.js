import React from 'react'
import Card from '../components/Card'
import Masonry from 'masonry-layout'
import CardStore from '../stores/CardStore'

const getState = (deck) => {
  return {
    cards: CardStore.getFiltered(deck)
  }
}

const CardList = React.createClass({

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
  },
  
  render: function() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <ul className="card-list" ref={(ul) => { this.list = ul }}>
          {this._renderCards()}
        </ul>
      </div>
    )
  },

  _renderCards: function() {
    return this.state.cards.map(card => (
      <Card key={card.name} {...card} />
    ))
  },

  _onChange: function() {
    this.setState(getState(this.props.id))
  }

})

export default CardList
import React from 'react'
import Card from '../components/Card'
import Masonry from 'masonry-layout'

const CardList = React.createClass({

  componentDidUpdate: function() {
    this.masonry.reloadItems()
  },
  
  render: function() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <ul className="card-list" ref={(ul) => { this._masonryList(ul) }}>
          {this._renderCards()}
        </ul>
      </div>
    )
  },

  _renderCards: function() {
    return this.props.cards.map(card => (
      <Card key={card.name} {...card} />
    ))
  },

  _masonryList: function(elem) {
    this.masonry = new Masonry( elem, {
      itemSelector: '.card',
      gutter: 10,
      percentPosition: true
    })
  }

})

export default CardList
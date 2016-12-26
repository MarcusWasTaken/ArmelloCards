import React from 'react'
import CardList from './CardList'
import CardStore from '../stores/CardStore'
import 'css/main'

const getState = () => {
  return {
    decks: CardStore.getArray()
  }
}

const App = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    CardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CardStore.removeChangeListener(this._onChange);
  },

  render: function() {

    return (
      <div className="main">
        {this._renderCardList()}
      </div>
    )
  },

  _renderCardList: function() {
    return this.state.decks.map(deck => (
      <CardList key={deck.name} {...deck} />
    ))
  },

  _onChange: function() {
    this.setState(getState());
  }

})

export default App
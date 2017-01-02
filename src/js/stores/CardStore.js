import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter } from 'events'
import FilterStore from './FilterStore'
import lib from 'js/lib'
import decksJSON from 'src/decks'
import cardsJSON from 'src/cards'

const initializeCards = (decks, cards) => {
  let cardsArr = []
  for (let i = 0; i < decks.length; i++) {
    let cardsInDeck = cards[decks[i].id]
    if (typeof cardsInDeck !== 'undefined') {
      cardsArr = cardsArr.concat(cardsInDeck)
    }
  }
  return cardsArr
}

const _cards = initializeCards(decksJSON, cardsJSON)

let _filteredCards = [].concat(_cards)

const filterByText = (filter) => {
  _filteredCards = _cards.filter(card => {
    return card.name.toLowerCase().search(filter) !== -1 || card.type.toLowerCase().search(filter) !== -1
  })
}

const filterBySymbol = (filter) => {
  _filteredCards = _cards.filter(card => {
    return filter.find(symbol => { return symbol.name === card.symbol}).active
  })
  if (_filteredCards.length === 0) {
    _filteredCards = _filteredCards.concat(_cards)
  }
}

const CardStore = Object.assign({}, EventEmitter.prototype, {

  getByDeck: (deckName) => {
    return _cards.filter(card => { return card.deck == deckName })
  },

  getFiltered: (deckName) => {
    return _filteredCards.filter(card => { return card.deck == deckName })
  },

  emitChange: () => {
    CardStore.emit('change')
  },

  addChangeListener: (callback) => {
    CardStore.on('change', callback)
  },

  removeChangeListener: (callback) => {
    CardStore.removeListener('change', callback)
  }
})

CardStore.dispatchToken = AppDispatcher.register((action) => {
  switch(action.actionType) {

    case 'FILTER':
      AppDispatcher.waitFor([FilterStore.dispatchToken])
      if (action.type === 'text') {
        filterByText(action.filter)
      } else if (action.type === 'symbol') {
        filterBySymbol(FilterStore.get('symbol'))
      }
      CardStore.emitChange()
      break

    default:
      //no op
  }
})

export default CardStore
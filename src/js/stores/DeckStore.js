import AppDispatcher from '../dispatcher/AppDispatcher'
import CardStore from './CardStore'
import { EventEmitter } from 'events'

const _decks = [
  {
    "id": "items",
    "name": "Items",
    "cardCount": "0",
    "filteredCardCount": "0"
  },
  {
    "id": "spells",
    "name": "Spells",
    "cardCount": "0",
    "filteredCardCount": "0"
  }
]

const _decksFilteredCards = [
  {
    "id": "items"
  },
  {
    "id": "spells"
  }
]

const cardCounter = (deck) => {
  let count = 0
  for (let i = 0; i < deck.length; i++) {
    let card = deck[i]
    count += parseInt(card.rarity)
  }
  return count
}

const filterCards = () => {
  for (let i = 0; i < _decks.length; i++) {
    let deck = _decks[i]
    deck.filteredCardCount = cardCounter(CardStore.getFiltered(deck.id))
  }
}

//init decks with the amount of cards in them from CardStore
for (let i = 0; i < _decks.length; i++) {
  let deck = _decks[i]
  deck.cardCount = cardCounter(CardStore.getByDeck(deck.id))
  deck.filteredCardCount = cardCounter(CardStore.getFiltered(deck.id))
}

const DeckStore = Object.assign({}, EventEmitter.prototype, {
  get: (query) => {
    return _decks.filter(deck => { return deck.id == query.toLowerCase() })
  },

  getAll: () => {
    return _decks
  },

  emitChange: () => {
    DeckStore.emit('change')
  },

  addChangeListener: (callback) => {
    DeckStore.on('change', callback)
  },

  removeChangeListener: (callback) => {
    DeckStore.removeListener('change', callback)
  }
})

AppDispatcher.register((action) => {
  switch(action.actionType) {

    case 'FILTER':
      AppDispatcher.waitFor([CardStore.dispatchToken])
      filterCards()
      DeckStore.emitChange()
      break

    default:
      //no op
  }
})

export default DeckStore
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
  },
  {
    "id": "followers",
    "name": "Followers",
    "cardCount": "0",
    "filteredCardCount": "0"
  },
  {
    "id": "treasure",
    "name": "Treasure",
    "cardCount": "0",
    "filteredCardCount": "0"
  }
]

let _activeDeck = _decks[0].id

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

const setActive = (deckName) => {
  _activeDeck = deckName
}

//init decks with the amount of cards in them from CardStore
for (let i = 0; i < _decks.length; i++) {
  let deck = _decks[i]
  deck.cardCount = cardCounter(CardStore.getByDeck(deck.id))
  deck.filteredCardCount = cardCounter(CardStore.getFiltered(deck.id))
}

const DeckStore = Object.assign({}, EventEmitter.prototype, {
  get: (query) => {
    return _decks.find(deck => { return deck.id == query.toLowerCase() })
  },

  getActive: () => {
    return DeckStore.get(_activeDeck)
  },

  getActiveName: () => {
    return _activeDeck
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

    case 'ACTIVE_DECK':
      setActive(action.deckName)
      DeckStore.emitChange()
      break

    default:
      //no op
  }
})

export default DeckStore
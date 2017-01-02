import AppDispatcher from '../dispatcher/AppDispatcher'
import CardStore from './CardStore'
import { EventEmitter } from 'events'
import deckData from 'src/decks'

const cardCounter = (deck) => {
  let count = 0
  for (let i = 0; i < deck.length; i++) {
    let card = deck[i]
    count += parseInt(card.rarity)
  }
  return count
}

const _decks = deckData.map(deck => {
  deck.cardCount = cardCounter(CardStore.getByDeck(deck.id))
  deck.filteredCardCount = deck.cardCount
  return deck
})

let _activeDeck = _decks[0].id

const filterCards = () => {
  for (let i = 0; i < _decks.length; i++) {
    let deck = _decks[i]
    deck.filteredCardCount = cardCounter(CardStore.getFiltered(deck.id))
  }
}

const setActive = (deckName) => {
  _activeDeck = deckName
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
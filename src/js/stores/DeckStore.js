import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter } from 'events'

var _decks = [
  {
    "id": "items",
    "name": "Items"
  },
  {
    "id": "spells",
    "name": "Spells",
  }
]

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

    default:
      //no op
  }
})

export default DeckStore
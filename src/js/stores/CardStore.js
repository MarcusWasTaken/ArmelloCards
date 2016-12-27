import AppDispatcher from '../dispatcher/AppDispatcher'
import FilterStore from './FilterStore'
import { EventEmitter } from 'events'
import lib from 'js/lib'

const _cards = [
  {
    "id": "bastard_sword",
    "deck": "items",
    "name": "Bastard Sword",
    "symbol": "sword"
  },
  {
    "id": "heavy_plate_armour",
    "deck": "items",
    "name": "Heavy Plate Armour",
    "symbol": "shield"
  },
  {
    "id": "hot_rot_wine",
    "deck": "items",
    "name": "Hot Rot Wine",
    "symbol": "rot"
  },
  {
    "id": "longbow",
    "deck": "items",
    "name": "Longbow",
    "symbol": "moon"
  },
  {
    "id": "sailors_lantern",
    "deck": "items",
    "name": "Sailor's Lantern",
    "symbol": "sun"
  },
  {
    "id": "bark_skin",
    "deck": "spells",
    "name": "Bark Skin",
    "symbol": "sun"
  },
  {
    "id": "divination",
    "deck": "spells",
    "name": "Divination",
    "symbol": "sun"
  },
  {
    "id": "lightning_strike",
    "deck": "spells",
    "name": "Lightning Strike",
    "symbol": "moon"
  },
  {
    "id": "moonbite",
    "deck": "spells",
    "name": "Moonbite",
    "symbol": "moon"
  },
  {
    "id": "rite_of_wyld",
    "deck": "spells",
    "name": "Rite of Wyld",
    "symbol": "wyld"
  }
]

let _filteredCards = [].concat(_cards)

const filterByText = (filter) => {
  _filteredCards = _cards.filter(card => {
    return card.name.toLowerCase().search(filter) !== -1
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

AppDispatcher.register((action) => {
  switch(action.actionType) {

    case 'TEXT_FILTER':
      AppDispatcher.waitFor([FilterStore.dispatchToken])
      filterByText(action.filter)
      CardStore.emitChange()
      break

    case 'SYMBOL_FILTER':
      AppDispatcher.waitFor([FilterStore.dispatchToken])
      filterBySymbol(FilterStore.get('symbol'))
      CardStore.emitChange()
      break

    default:
      //no op
  }
})

export default CardStore
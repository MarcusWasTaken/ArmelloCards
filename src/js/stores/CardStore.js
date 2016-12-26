import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter } from 'events'
import lib from 'js/lib'

var _cards = {
  "items": {
    "name": "Items",
    "cards": [
      {
        "id": "bastard_sword",
        "name": "Bastard Sword",
        "symbol": "sword"
      },
      {
        "id": "heavy_plate_armour",
        "name": "Heavy Plate Armour",
        "symbol": "shield"
      },
      {
        "id": "hot_rot_wine",
        "name": "Hot Rot Wine",
        "symbol": "rot"
      },
      {
        "id": "longbow",
        "name": "Longbow",
        "symbol": "moon"
      },
      {
        "id": "sailors_lantern",
        "name": "Sailor's Lantern",
        "symbol": "sun"
      }
    ]
  },
  "spells": {
    "name": "Spells",
    "cards": [
      {
        "id": "bark_skin",
        "name": "Bark Skin",
        "symbol": "sun"
      },
      {
        "id": "divination",
        "name": "Divination",
        "symbol": "sun"
      },
      {
        "id": "lightning_strike",
        "name": "Lightning Strike",
        "symbol": "moon"
      },
      {
        "id": "moonbite",
        "name": "Moonbite",
        "symbol": "moon"
      },
      {
        "id": "rite_of_wyld",
        "name": "Rite of Wyld",
        "symbol": "wyld"
      }
    ]
  }
}

const CardStore = Object.assign({}, EventEmitter.prototype, {
  get: (deck, name = '') => {
    return name === '' ? _cards[deck] : _cards[deck]['cards'][name]
  },

  getAll: (deck = '') => {
    return deck === '' ? _cards : _cards[deck]
  },

  getArray: () => {
    return lib.toArray(_cards)
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

    default:
      //no op
  }
})

export default CardStore
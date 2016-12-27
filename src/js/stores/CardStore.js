import AppDispatcher from '../dispatcher/AppDispatcher'
import FilterStore from './FilterStore'
import { EventEmitter } from 'events'
import lib from 'js/lib'

const _cards = [
  {
    "id": "adventurers_kit",
    "deck": "items",
    "name": "Adventurer's Kit",
    "symbol": "shield",
    "rarity": "4",
    "type": "equippable"
  },
  {
    "id": "bastard_sword",
    "deck": "items",
    "name": "Bastard Sword",
    "symbol": "sword",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "battle_armour",
    "deck": "items",
    "name": "Battle Armour",
    "symbol": "shield",
    "rarity": "3",
    "type": "equippable"
  },
  {
    "id": "battle_axe",
    "deck": "items",
    "name": "Battle Axe",
    "symbol": "sword",
    "rarity": "4",
    "type": "equippable"
  },
  {
    "id": "brazenberry_ale",
    "deck": "items",
    "name": "Brazenberry Ale",
    "symbol": "sun",
    "rarity": "3",
    "type": "play to creature"
  },
  {
    "id": "bubble_tea",
    "deck": "items",
    "name": "Bubble Tea",
    "symbol": "wyld",
    "rarity": "1",
    "type": "play to hero"
  },
  {
    "id": "chainmail_shirt",
    "deck": "items",
    "name": "Chainmail Shirt",
    "symbol": "shield",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "cubs_blood",
    "deck": "items",
    "name": "Cub’s Blood",
    "symbol": "rot",
    "rarity": "1",
    "type": "play to empty tile"
  },
  {
    "id": "feathered_helm",
    "deck": "items",
    "name": "Feathered Helm",
    "symbol": "shield",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "hares_halberd",
    "deck": "items",
    "name": "Hare's Halberd",
    "symbol": "sword",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "heavy_flail",
    "deck": "items",
    "name": "Heavy Flail",
    "symbol": "sword",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "heavy_plate_armour",
    "deck": "items",
    "name": "Heavy Plate Armour",
    "symbol": "shield",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "hot_rot_wine",
    "deck": "items",
    "name": "Hot Rot Wine",
    "symbol": "rot",
    "rarity": "3",
    "type": "play to creature"
  },
  {
    "id": "iron_pike",
    "deck": "items",
    "name": "Iron Pike",
    "symbol": "sword",
    "rarity": "4",
    "type": "equippable"
  },
  {
    "id": "leather_armour",
    "deck": "items",
    "name": "Leather Armour",
    "symbol": "shield",
    "rarity": "4",
    "type": "equippable"
  },
  {
    "id": "longbow",
    "deck": "items",
    "name": "Longbow",
    "symbol": "moon",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "lords_scepter",
    "deck": "items",
    "name": "Lord’s Scepter",
    "symbol": "sword",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "marauder_gauntlets",
    "deck": "items",
    "name": "Marauder Gauntlets",
    "symbol": "rot",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "moon_juice",
    "deck": "items",
    "name": "Moon Juice",
    "symbol": "moon",
    "rarity": "4",
    "type": "play to hero"
  },
  {
    "id": "mountain_moss",
    "deck": "items",
    "name": "Mountain Moss",
    "symbol": "wyld",
    "rarity": "3",
    "type": "play to creature"
  },
  {
    "id": "oak_spear",
    "deck": "items",
    "name": "Oak Spear",
    "symbol": "sword",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "poisoned_dagger",
    "deck": "items",
    "name": "Poisoned Dagger",
    "symbol": "rot",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "poisoned_gift",
    "deck": "items",
    "name": "Poisoned Gift",
    "symbol": "rot",
    "rarity": "2",
    "type": "play to hero, king’s guard"
  },
  {
    "id": "rangers_cloak",
    "deck": "items",
    "name": "Ranger’s Cloak",
    "symbol": "shield",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "sailors_lantern",
    "deck": "items",
    "name": "Sailor’s Lantern",
    "symbol": "sun",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "shining_steel_sword",
    "deck": "items",
    "name": "Shining Steel Sword",
    "symbol": "sword",
    "rarity": "4",
    "type": "equippable"
  },
  {
    "id": "snake_venom",
    "deck": "items",
    "name": "Snake Venom",
    "symbol": "rot",
    "rarity": "2",
    "type": "play to creature"
  },
  {
    "id": "spy_glass",
    "deck": "items",
    "name": "Spy Glass",
    "symbol": "moon",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "throwing_axe",
    "deck": "items",
    "name": "Throwing Axe",
    "symbol": "sword",
    "rarity": "3",
    "type": "play to creature"
  },
  {
    "id": "torch",
    "deck": "items",
    "name": "Torch",
    "symbol": "sword",
    "rarity": "3",
    "type": "equippable"
  },
  {
    "id": "tower_shield",
    "deck": "items",
    "name": "Tower Shield",
    "symbol": "shield",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "trusty_shield",
    "deck": "items",
    "name": "Trusty Shield",
    "symbol": "shield",
    "rarity": "4",
    "type": "equippable"
  },
  {
    "id": "war_hammer",
    "deck": "items",
    "name": "War Hammer",
    "symbol": "sword",
    "rarity": "2",
    "type": "equippable"
  },
  {
    "id": "war_horn",
    "deck": "items",
    "name": "War Horn",
    "symbol": "sword",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "wyld_weed",
    "deck": "items",
    "name": "Wyld Weed",
    "symbol": "wyld",
    "rarity": "4",
    "type": "play to creature"
  },
  {
    "id": "wyldsap",
    "deck": "items",
    "name": "Wyldsap",
    "symbol": "wyld",
    "rarity": "4",
    "type": "play to creature"
  },
  {
    "id": "bark_skin",
    "deck": "spells",
    "name": "Bark Skin",
    "symbol": "sun",
    "rarity": "3",
    "type": "play to creature"
  },
  {
    "id": "divination",
    "deck": "spells",
    "name": "Divination",
    "symbol": "sun",
    "rarity": "3",
    "type": "play to hero"
  },
  {
    "id": "lightning_strike",
    "deck": "spells",
    "name": "Lightning Strike",
    "symbol": "moon",
    "rarity": "2",
    "type": "play to hero, tile"
  },
  {
    "id": "moonbite",
    "deck": "spells",
    "name": "Moonbite",
    "symbol": "moon",
    "rarity": "3",
    "type": "play to creature, dungeon, plains"
  },
  {
    "id": "rite_of_wyld",
    "deck": "spells",
    "name": "Rite of Wyld",
    "symbol": "wyld",
    "rarity": "1",
    "type": "play to bane, stone circle"
  }
]

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
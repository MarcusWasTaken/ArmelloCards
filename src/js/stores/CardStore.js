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
    "id": "alchemist",
    "deck": "followers",
    "name": "Alchemist",
    "symbol": "moon",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "apothecary",
    "deck": "followers",
    "name": "Apothecary",
    "symbol": "shield",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "apprentice",
    "deck": "followers",
    "name": "apprentice",
    "symbol": "moon",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "bard",
    "deck": "followers",
    "name": "Bard",
    "symbol": "moon",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "berserker",
    "deck": "followers",
    "name": "Berserker",
    "symbol": "sword",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "blacksmith",
    "deck": "followers",
    "name": "Blacksmith",
    "symbol": "shield",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "brilliant_fool",
    "deck": "followers",
    "name": "Brilliant Fool",
    "symbol": "sun",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "coin_master",
    "deck": "followers",
    "name": "Coin Master",
    "symbol": "shield",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "conjurer",
    "deck": "followers",
    "name": "Conjurer",
    "symbol": "moon",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "diplomat",
    "deck": "followers",
    "name": "Diplomat",
    "symbol": "sun",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "explorer",
    "deck": "followers",
    "name": "Explorer",
    "symbol": "moon",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "miner",
    "deck": "followers",
    "name": "Miner",
    "symbol": "shield",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "poison_taster",
    "deck": "followers",
    "name": "Poison Taster",
    "symbol": "shield",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "spy_master",
    "deck": "followers",
    "name": "Spy Master",
    "symbol": "shield",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "squire",
    "deck": "followers",
    "name": "Squire",
    "symbol": "shield",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "the_stranger",
    "deck": "followers",
    "name": "The Stranger",
    "symbol": "moon",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "trader",
    "deck": "followers",
    "name": "Trader",
    "symbol": "moon",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "warlock",
    "deck": "followers",
    "name": "Warlock",
    "symbol": "rot",
    "rarity": "1",
    "type": "recruitable"
  },
  {
    "id": "bane_blade",
    "deck": "treasure",
    "name": "Bane Blade",
    "symbol": "rot",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "banes_claw",
    "deck": "treasure",
    "name": "Bane's Claw",
    "symbol": "rot",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "hand_cannons",
    "deck": "treasure",
    "name": "Hand Cannons",
    "symbol": "sun",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "helm_of_heroes",
    "deck": "treasure",
    "name": "Helm of Heroes",
    "symbol": "shield",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "heroes_shield",
    "deck": "treasure",
    "name": "Heroe's Shield",
    "symbol": "shield",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "lionheart_breast_plate",
    "deck": "treasure",
    "name": "Lionheart Breast Plate",
    "symbol": "shield",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "masquerade_mask",
    "deck": "treasure",
    "name": "Masquerade Mask",
    "symbol": "moon",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "mirror_cape",
    "deck": "treasure",
    "name": "Mirror Cape",
    "symbol": "moon",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "moon_scythe",
    "deck": "treasure",
    "name": "Moon Scythe",
    "symbol": "moon",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "poppet",
    "deck": "treasure",
    "name": "Poppet",
    "symbol": "rot",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "ravens_beak_dagger",
    "deck": "treasure",
    "name": "Raven's Beak Dagger",
    "symbol": "rot",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "royal_banner",
    "deck": "treasure",
    "name": "Royal Banner",
    "symbol": "shield",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "royal_pardon",
    "deck": "treasure",
    "name": "Royal Pardon",
    "symbol": "shield",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "royal_shield",
    "deck": "treasure",
    "name": "Royal Shield",
    "symbol": "shield",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "silver_lance",
    "deck": "treasure",
    "name": "Silver Lance",
    "symbol": "sun",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "winged_boots",
    "deck": "treasure",
    "name": "Winged Boots",
    "symbol": "sun",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "wyld_talisman",
    "deck": "treasure",
    "name": "Wyld Talisman",
    "symbol": "wyld",
    "rarity": "1",
    "type": "equippable"
  },
  {
    "id": "wyldfyre_staff",
    "deck": "treasure",
    "name": "Wyldfyre Staff",
    "symbol": "wyld",
    "rarity": "1",
    "type": "equippable"
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
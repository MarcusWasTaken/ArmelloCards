import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter } from 'events'
import lib from 'js/lib'

let _activeFilter = ''
let _textFilter = ''
let _symbolFilter = [
  {
    name: 'sword',
    active: false
  },
  {
    name: 'shield', 
    active: false
  },
  {
    name: 'sun', 
    active: false
  },
  {
    name: 'moon', 
    active: false
  },
  {
    name: 'wyld', 
    active: false
  },
  {
    name: 'rot', 
    active: false
  }
]

const applyTextFilter = (filter) => {
  for (let i = 0; i < _symbolFilter.length; i++) {
    _symbolFilter[i].active = false
  }
  _textFilter = filter
  _activeFilter = 'text'
  
}

const applySymbolFilter = (filter) => {
  _textFilter = ''
  let sym = _symbolFilter.find(symbol => { return symbol.name === filter })
  sym.active = !sym.active
  _activeFilter = 'symbol'
}

const FilterStore = Object.assign({}, EventEmitter.prototype, {

  get: (filter) => {
    if (filter == 'text') {
      return _textFilter
    } else if (filter == 'symbol') {
      return _symbolFilter
    }
  },

  getActive: () => {
    return {
      name: _activeFilter,
      filter: FilterStore.get(_activeFilter)
    }
  },

  emitChange: () => {
    FilterStore.emit('change')
  },

  addChangeListener: (callback) => {
    FilterStore.on('change', callback)
  },

  removeChangeListener: (callback) => {
    FilterStore.removeListener('change', callback)
  }
})

FilterStore.dispatchToken = AppDispatcher.register((action) => {
  switch(action.actionType) {

    case 'FILTER':
      if (action.type === 'text') {
        applyTextFilter(action.filter)
      } else if (action.type === 'symbol') {
        applySymbolFilter(action.filter)
      }
      FilterStore.emitChange()
      break

    default:
      //no op
  }
})

export default FilterStore
import AppDispatcher from '../dispatcher/AppDispatcher'

const FilterActions = {
  
  filterText: (filter) => {
    AppDispatcher.dispatch({
      actionType: 'TEXT_FILTER',
      filter
    })
  },

  filterSymbol: (filter) => {
    AppDispatcher.dispatch({
      actionType: 'SYMBOL_FILTER',
      filter
    })
  }
  
}

export default FilterActions
import AppDispatcher from '../dispatcher/AppDispatcher'

const FilterActions = {

  setActive: (deckName) => {
    AppDispatcher.dispatch({
      actionType: 'ACTIVE_DECK',
      deckName
    })
  }

}

export default FilterActions
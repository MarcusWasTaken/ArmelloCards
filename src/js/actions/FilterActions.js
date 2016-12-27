import AppDispatcher from '../dispatcher/AppDispatcher'

const FilterActions = {

  filter: (filter, type) => {
    AppDispatcher.dispatch({
      actionType: 'FILTER',
      filter,
      type
    })
  }

}

export default FilterActions
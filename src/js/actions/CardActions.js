import AppDispatcher from '../dispatcher/AppDispatcher'

const CardActions = {
  
  filter: (filter) => {
    AppDispatcher.dispatch({
      actionType: 'FILTER_CARDS',
      filter
    })
  }
  
}

export default CardActions
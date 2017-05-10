import AppDispatcher from '../dispatcher/AppDispatcher'

export const setActiveDeck = (deckName) => ({
  actionType: 'ACTIVE_DECK',
  deckName
})
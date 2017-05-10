import React from 'react'
import Deck from 'containers/Deck'
import DeckList from 'containers/DeckList'
import Filters from 'containers/Filters'
import 'css/app'
import { setActiveDeck } from 'actions/DeckActions'

const App = () => (
  <div className="app clearfix">
    {console.log(setActiveDeck('foo'))}
    {/*
    <div className="main">
      <DeckList />
      <Deck />
    </div>
    <aside className="aside">
      <h1>Armello Cards</h1>
      <Filters />
    </aside>
    */}
  </div>
)

export default App
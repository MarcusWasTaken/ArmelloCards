import React from 'react'
import Deck from '../containers/Deck'
import DeckList from '../containers/DeckList'
import Filters from '../containers/Filters'
import 'css/app'

const App = () => (
  <div className="app clearfix">
    <p>foo</p>
    <div className="main">
      <DeckList />
      <Deck />
    </div>
    <aside className="aside">
      <h1>Armello Cards</h1>
      <Filters />
      {/*<h5>Options</h5>*/}
    </aside>
  </div>
)

export default App
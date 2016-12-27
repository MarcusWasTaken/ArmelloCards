import React from 'react'
import cx from 'classnames'

const DeckTab = ({ active, id, name, cardCount, filteredCardCount, onClick }) => (
  <li className={cx({ active: active === id })}>
    <a href="#" value={id} onClick={onClick}>
      {`${name} ${filteredCardCount}/${cardCount}`}
    </a>
  </li>
)

export default DeckTab
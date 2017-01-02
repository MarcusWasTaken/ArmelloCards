import React from 'react'
import cx from 'classnames'

const DeckTab = ({ active, id, name, cardCount, filteredCardCount, onClick }) => (
  <li className={cx("tab-item", { active: active === id })}>
    <a href="#" value={id} onClick={onClick}>
      <img className="tab-icon" src={`/images/deck_icon_${id}.png`} />
      <span className="tab-count">
        {`${filteredCardCount}/${cardCount}`}
      </span>
    </a>
  </li>
)

export default DeckTab
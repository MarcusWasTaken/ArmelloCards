import React from 'react'
import cx from 'classnames'

const Symbol = ({ name, active, onClick }) => (
  <button
    key={name}
    className={cx('btn btn-default', {
      active: active
    })}
    value={name}
    onClick={onClick('symbol')}
  >
    {name}
  </button>
)

export default Symbol
import React from 'react'

const Card = ({ name, symbol }) => (
  <li className="card">
    <div className="card-image-wrapper">
      <img width="480" height="240" src="http://placehold.it/480x240"/>
    </div>
    <p className="card-name">{name}</p>
    <p className="card-symbol">{symbol}</p>
  </li>
)

export default Card
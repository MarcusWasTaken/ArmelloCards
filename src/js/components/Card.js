import React from 'react'

const Card = ({ id, name, deck, symbol }) => (
  <li className="card">
    <div className="card-image-wrapper">
      <img 
        width="548" 
        height="278"
        src={`https://s3.eu-west-2.amazonaws.com/armello-cards-assets/cards/${deck}/${id}.png`}
        alt={`${name} card image`}
      />
    </div>
  </li>
)

export default Card
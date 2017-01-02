import React from 'react'

//`http://res.cloudinary.com/hwbsj3sqb/image/upload/${deck}/${id}`

const Card = ({ id, name, deck, symbol }) => (
  <li className="card">
    <div className="card-image-wrapper">
      <img 
        width="577" 
        height="293" 
        src={`http://res.cloudinary.com/hwbsj3sqb/image/upload/${deck}/static/${id}.png`}
        alt={`${name} card image`}
      />
    </div>
  </li>
)

export default Card
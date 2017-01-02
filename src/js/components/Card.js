import React from 'react'

//`http://res.cloudinary.com/hwbsj3sqb/image/upload/${deck}/${id}`

const Card = ({ id, name, deck, symbol }) => (
  <li className="card">
    <div className="card-image-wrapper">
      <img 
        width="548" 
        height="278" 
        src={`http://res.cloudinary.com/hwbsj3sqb/image/upload/c_scale,h_278,q_100,w_548/${deck}/static/${id}.png`}
        alt={`${name} card image`}
      />
    </div>
  </li>
)

export default Card
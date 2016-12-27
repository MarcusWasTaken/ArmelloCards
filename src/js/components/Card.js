import React from 'react'

const Card = ({ id, name, deck, symbol }) => (
  <li className="card">
    <div className="card-image-wrapper">
      <img width="512" height="256" src={`http://res.cloudinary.com/hwbsj3sqb/image/upload/${deck}/${id}.gif`}/>
    </div>
  </li>
)

export default Card
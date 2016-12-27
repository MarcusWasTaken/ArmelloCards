import React from 'react'

const SearchBar = ({ onChange, value }) => (
  <input 
    className="form-control"
    onChange={onChange('text')}
    value={value}
  />
)

export default SearchBar
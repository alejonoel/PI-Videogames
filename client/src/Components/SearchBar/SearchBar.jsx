import React from 'react'
import { useDispatch } from 'react-redux';
import { searchVideogames } from '../../Redux/Actions';
import "./searchbar.css"


const SearchBar = () => {

  const dispatch = useDispatch();
  
  const search = (event) => {
      console.log(event.target.value)
      dispatch(searchVideogames(event.target.value))
    }
  return (
    <div className="search-bar-container">
      <input type="text"
             placeholder="Search videogames"
             onChange={search}
             className="search-input"/> 
    </div>
  )
}

export default SearchBar
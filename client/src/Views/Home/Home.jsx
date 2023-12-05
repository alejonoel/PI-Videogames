import React, {useEffect} from 'react'
import Navbar from "../../Components/NavBar/Navbar"
import SearchBar from "../../Components/SearchBar/SearchBar"
import { useDispatch, useSelector } from 'react-redux';
import { filterByGenre, filterByOrigen, getGenres, getVideogames , order, paginate, reset } from '../../Redux/Actions';
import Cards from "../../Components/Cards/Cards"
import "./home.css";

const Home = () => {

  const dispatch = useDispatch();
  const allVideogames = useSelector( (state) => state.allVideogames);
  const allGenres = useSelector((state) => state.allGenres)
  const currentPage = useSelector((state) => state.currentPage)
  const totalPages = useSelector((state) => state.totalPages);
  const loading = useSelector((state) => state.loading)

  useEffect( () => {
    dispatch(getVideogames())
    dispatch(getGenres())
    return () => dispatch(reset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handlePaginate = (event) => {
    dispatch(paginate(event.target.name))
  }

  const handleFilter = (event) => {
    if(event.target.name === "genres"){
      dispatch(filterByGenre(event.target.value))
    } else if (event.target.name === "origen"){
      dispatch(filterByOrigen(event.target.value))
    }
  }

  const handleOrder = (event) => {
    dispatch(order(event.target.name))
  }

  return (
    <div className='home-conte'>
        <div>
          <Navbar/>
        </div>
      <div className='home-container'>
        <div className='videogame-sidebar' >

          <div>
            <SearchBar/>
          </div>

          <div>
            <h4>Filter</h4>
            <div>
              <select name="genres" onChange={handleFilter}>
                    <option value="">by genre</option>
                    {allGenres?.map( (i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div>
            <select name="origen" onChange={handleFilter}>
                    <option value="">by origen</option>
                    <option value="BD">BD</option>
                    <option value="API">API</option>
              </select>
            </div>
          </div>

          <div>
            <h4>Order</h4>
            <div>
              <div>
                <button onClick={handleOrder} name="AZ">A-Z</button>
              </div>
              <div>
                <button onClick={handleOrder} name='ZA'>Z-A</button>
              </div>
              
              <div>
                <button onClick={handleOrder}name="ratingUp">RATING ⮭</button>
                <button onClick={handleOrder}name='ratingDown'>RATING ⮯</button>
              </div>

              <div>
              <button onClick={() => {dispatch(reset())}}>Clean filters</button>
              </div>
            </div>
          </div>

        </div>
      <div className='home-content'>
        {loading?
          (<div className="loading-container">
          <div className="loading-spinner"></div>
        </div>):
        <div className='home-content'>
        <Cards allVideogames={allVideogames}></Cards>
        
        <div className='button-container'>
          <button name='prev' onClick={handlePaginate}>prev</button>
          <label>Page {currentPage} of {totalPages}</label>
          <button name='next' onClick={handlePaginate}>next</button>
        </div>
        </div>
        } 
      </div>
      </div>
    </div>
  )
}

export default Home
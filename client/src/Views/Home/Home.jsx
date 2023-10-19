import React, {useEffect} from 'react'
import Navbar from "../../Components/NavBar/Navbar"
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../../Redux/Actions';
import Cards from "../../Components/Cards/Cards"
import "./home.css";

const Home = () => {

  const dispatch = useDispatch();
  const allVideogames = useSelector( (state) => state.allVideogames);

  useEffect( () => {
    dispatch(getVideogames())
  },[])

  // Verifica si allVideogames tiene un valor antes de acceder a sus propiedades
  if (!allVideogames) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se carga la data
  }

  return (
    <div className='home-cont'>
      <div>
        <Navbar/>
      </div>
      <div>
        <Cards allVideogames={allVideogames}></Cards>
      </div>
    </div>
  )
}

export default Home
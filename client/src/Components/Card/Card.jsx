import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteGameFromBD } from '../../Redux/Actions/index';
import "./card.css"

const Card = ({game}) => {

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteGameFromBD(game.id))
  }

  return (
    <div className='card-contenedor'>

          {game.origen==="BD"&&(
            <button onClick={handleDelete} className="delete-button">x</button>
          )}
      <Link to={`/videogames/${game.id}`}>
        
        <div className='card-content'> 
          <h2 className='card-title'>{game.name}</h2>
          <div className='card-imagen'>
              <img  src={game.image} alt="" />
          </div>
          <div >
            
            <div className='card-genre-list'>
              {game.genres && game.genres.map((genre, index) => (
                  <div key={index} className='card-genre-item'>
                    {genre}
                  </div>
              ))}
            </div>

          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
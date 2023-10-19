import React from 'react';
import { Link } from 'react-router-dom';
import "./card.css"

const Card = ({game}) => {
  return (
    <div className='card-contenedor'>
      {console.log(game)}
      <Link to={`/videogames/${game.id}`}>
        <div className='card-imagen'>
            <img  src={game.image} alt="" />
        </div>
        <div className='card-estilo'>
            <h4>{game.name}</h4>
            <h5>{game.genres.map((g) => g+", ")}</h5>
        </div>
        </Link>
    </div>
  )
}

export default Card
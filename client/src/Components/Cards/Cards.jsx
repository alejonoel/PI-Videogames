import React from 'react';
import Card from '../Card/Card';
import "./cards.css"

const Cards = ({allVideogames}) => {
  return (
    <div className='cards-container'>
      {allVideogames?.map( i => 
          <Card key={i.id} game={i}/> )}
    </div>
  )
}

export default Cards
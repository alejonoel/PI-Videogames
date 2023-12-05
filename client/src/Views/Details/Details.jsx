import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGamesByID } from '../../Redux/Actions';
import Navbar from "../../Components/NavBar/Navbar";
import "./details.css"

const renderRatingStars = (rating) => {
  const starPercentage = (rating / 5) * 100;

  return (
    <div className="star-ratings-css">
      <div className="star-ratings-css-top" style={{ width: starPercentage + '%' }}>
        <span>★★★★★</span>
      </div>
      <div className="star-ratings-css-bottom">
        <span>★★★★★</span>
      </div>
    </div>
  );
};

const formatReleaseDate = (date) => {
  if (!date) return "";
  const formattedDate = new Date(date);
  return formattedDate.toISOString().split('T')[0];
};



const Details = () => {
  
  const dispatch = useDispatch();
  const params = useParams();
  const gameDetails = useSelector((state) => state.videogameDetail);
  
  useEffect(()=>{
    dispatch(getGamesByID(params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  

  return (
    <div>

      <Navbar />
      
      <div >
        <img src={gameDetails.image} className='details-image-container' alt='' />
        
        <div className='details-container'>
        <div className='details-info'>

          <div className='details-image-conta'>
            <img src={gameDetails.image} className='details-image' alt='' />
          </div>

          <div className='details-title-genres'>

            <h1 className='details-title'>{gameDetails.name}</h1>

              <div className='details-genres-rating'>
                <div className='details-genres'>
                  <ul className='details-genre-list'>
                    {gameDetails.genres && gameDetails.genres.map((genre, index) => (
                      <li key={index} className='details-genre-item'>
                        {genre}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className='details-rating'>
                  {renderRatingStars(gameDetails.rating)}
                </div>
              </div>
          </div>
        </div>
        
        <div className='details-platforms-date'>
          <div className='details-platforms'>
            <h2>Available Platforms</h2>
            <ul className='details-platform-list'>
              {gameDetails.platforms && gameDetails.platforms.map((platform, index) => (
                <li key={index} className='details-platform-item'>
                  {platform}
                </li>
              ))}
            </ul>
          </div>

          <div className='details-date'>
            <h2>Release Date</h2>
            {formatReleaseDate(gameDetails.date)}
          </div>
        </div>
        <div className='details-description' dangerouslySetInnerHTML={{ __html: gameDetails.description }}/>
  
      </div>
      </div>
    </div> 
  );
  

}

export default Details
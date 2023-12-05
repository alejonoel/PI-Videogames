import React from 'react'
import { Link } from 'react-router-dom'
import joystick from "../../images/joystick.webp"
import "./landing.css"


const Landing = () => {
  return (
      <div className='landing-cont'>
        <div className='landing-link'>
          <div className='landing zoom-cont'>
            <Link className='landing-link' to={"/home"}>
              <img src={joystick} alt="Texto alternativo" />
            </Link>
          </div>
        </div>
      </div>
  )
}

export default Landing
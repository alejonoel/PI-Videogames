import React from 'react'
import { Link } from 'react-router-dom'
import "./landing.css"


const Landing = () => {
  return (
      <div className='landing-cont'>
        <div>.</div>
        <div className='landing-text'>TIME TO PLAY</div>
        <div className='landing-link'>
          <div className='landing zoom-cont'>
            <Link className='landing-link' to={"/home"}>
              <img src="https://easyskinz.com/cdn/shop/products/titanium_54a1998d-ecfc-48b8-9c85-67c3ac2bb7a0.png?v=1644232047&width=1080" alt="Texto alternativo" />
            </Link>
          </div>
        </div>
      </div>
  )
}

export default Landing
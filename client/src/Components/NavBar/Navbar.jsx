import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to={"/"}>
          <img src="https://easyskinz.com/cdn/shop/products/titanium_54a1998d-ecfc-48b8-9c85-67c3ac2bb7a0.png?v=1644232047&width=1080" alt="" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li className="navbar-link">
          <Link to={"/home"}>Home</Link>
        </li>
        <li className="navbar-link">
          <Link to={"/form"}>Create Activity</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import joystick from "../../images/joystick.webp";
import './navbar.css';

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to={"/"}>
          <img src={joystick} alt="" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li className="navbar-link">
          <Link to={"/home"}>Home</Link>
        </li>
        <li className="navbar-link">
          <Link to={"/form"}>Add New Game</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;

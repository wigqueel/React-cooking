import React from 'react';
//import logo from './logo.svg';
import './App.scss';
import {Link} from 'react-router-dom';
import logoImg from "./img/logo.svg";

function Nav() {


  return (
  <nav> 
    <Link to="/recipes">
      <h3>logo
      <img src= {logoImg} alt="Smiley face" /> 
      
      </h3>
      </Link> 
      <ul className="nav-links">
      <Link to="/about">
          <li>About</li>
          </Link> 
      </ul>
  </nav>
  );
}

export default Nav;

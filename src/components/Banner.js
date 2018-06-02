import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Banner = (props) => {
  const { loggedIn, logout, bar } = props;
  return (
    <div className='main-header'>
      <span className="">UnTapped Trivia</span>
      { loggedIn ? 
        <div className='header-links'> 
          <NavLink 
            className='header-links' 
            onClick={logout} 
            to='/login'> { bar.name }, Log Out 
          </NavLink>
        </div>
      : 
        <NavLink className='header-links' to='/login'> Login </NavLink>
      }
    </div>
  )
}

export default Banner;
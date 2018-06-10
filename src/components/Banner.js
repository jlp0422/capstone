import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Banner = (props) => {
  const { loggedIn, logout, bar } = props;
  return (
    <div className='main-header'>
      <div className='header-brand'>
        <img className='header-img' width='60' height='60' src='/public/images/UTT-logo.png' />
        <div className='header-title'>UnTapped Trivia</div>
      </div>
      { loggedIn ? 
        <div className='header-links'> 
          <NavLink 
            className='header-links' 
            onClick={logout} 
            to='/login'> Log Out of { bar.name }
          </NavLink>
        </div>
      : 
        <NavLink className='header-links' to='/login'> Login </NavLink>
      }
    </div>
  )
}

export default Banner;

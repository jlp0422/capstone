import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div> THIS IS A SIDEBAR </div>
      <NavLink to='/' exact> Home </NavLink>
      <NavLink to='/login'> Login </NavLink>
      <NavLink to='/categories'> Categories </NavLink>
      <NavLink to='/teams'> Teams </NavLink>
      <NavLink to='/games/active'> Active Game </NavLink>
      <NavLink to='/games/past'> Past Games </NavLink>
    </div>
  )
}

export default Sidebar;
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
  return (
    props.login ?
      <div className='sidebar container-fluid'>
      <NavLink to='/' exact> Home </NavLink>
      {/* {
        props.login ?
        <NavLink to='/login'> Login </NavLink>
        :
        <NavLink to='/login' onClick={() => localStorage.removeItem('token')}> Logout </NavLink>
      } */}
      <NavLink to='/categories'> Categories </NavLink>
      <NavLink to='/teams'> Teams </NavLink>
      <NavLink to='/games/active'> Active Game </NavLink>
      <NavLink to='/games/past'> Past Games </NavLink>
    </div>
    : null
  )
}

export default Sidebar;
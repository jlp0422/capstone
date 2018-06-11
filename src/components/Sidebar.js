import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = props => {
  return (
    <div className="sidebar container-fluid">
      <NavLink to="/" exact>Home</NavLink>
      <NavLink to="/categories"> Categories </NavLink>
      <NavLink to="/teams"> Teams </NavLink>
      <NavLink to="/games/active"> Active Game </NavLink>
      <NavLink to="/games/past"> Past Games </NavLink>
      <NavLink to="/scores"> Scores </NavLink>
      <NavLink to="/stats">Stats</NavLink>
      <NavLink to="/checkout"> Buy Membership </NavLink>
    </div>
  );
};

export default Sidebar;
